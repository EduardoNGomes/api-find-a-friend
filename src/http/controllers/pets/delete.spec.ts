import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { City, Organization, Pet, State } from '@prisma/client'
import { hash } from 'bcryptjs'

interface AuthenticateTestProps {
  body: {
    token: string
  }
}

let stateTest: State
let cityTest: City
let organizationTest: Organization
let petTest: Pet
let authenticateTest: AuthenticateTestProps

describe('Create organization(e2e)', async () => {
  beforeEach(async () => {
    await app.ready()

    stateTest = await prisma.state.create({
      data: {
        name: 'rio_de_janeiro',
        uf: 'RJ',
      },
    })

    cityTest = await prisma.city.create({
      data: {
        name: 'rio_de_janeiro',
        state_id: stateTest.id,
      },
    })

    organizationTest = await prisma.organization.create({
      data: {
        name: 'John Doe Organization',
        email: 'johndoe@gmail.com',
        password_hashed: await hash('12345678', 6),
        address: 'street',
        cep: '22020202',
        number: '179',
        phone: '12345678946',
        city_id: cityTest.id,
      },
    })

    authenticateTest = await request(app.server)
      .post('/organizations/authenticate')
      .send({
        email: 'johndoe@gmail.com',
        password: '12345678',
      })

    petTest = await prisma.pet.create({
      data: {
        age: 'age test',
        description: 'description test',
        energy: 'energy Testing',
        environment: 'environment test',
        height: 'height test',
        image: 'image test',
        independence: 'delete',
        name: 'name test',
        city_id: cityTest.id,
        organization_id: organizationTest.id,
      },
    })
  })
  afterEach(async () => {
    await app.close()
  })

  it('should delete a pet with requirements', async () => {
    const data = await request(app.server)
      .delete(`/pets/${petTest.id}`)
      .set('Authorization', `Bearer ${authenticateTest.body.token}`)

    const quantityPets = await prisma.pet.findMany({
      where: {
        city_id: cityTest.id,
      },
    })

    const quantityPetsRequirements = await prisma.requirements.findMany({})

    expect(quantityPets).toHaveLength(0)
    expect(quantityPetsRequirements).toHaveLength(0)
    expect(data.status).toEqual(200)
  })
})

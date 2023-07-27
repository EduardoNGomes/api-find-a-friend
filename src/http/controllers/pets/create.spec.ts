import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { City, State } from '@prisma/client'
import { hash } from 'bcryptjs'
import { resolve } from 'path'

interface AuthenticateTestProps {
  body: {
    token: string
  }
}

let stateTest: State
let cityTest: City
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

    await prisma.organization.create({
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
  })
  afterEach(async () => {
    await app.close()
  })

  it('should create a pet with requirements', async () => {
    const data = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authenticateTest.body.token}`)
      .attach('image', resolve(__dirname, '../../../../tmp/linux.jpeg'))
      .field('age', 'filhote')
      .field('description', 'filhote')
      .field('energy', 'filhote')
      .field('environment', 'filhote')
      .field('height', 'filhote')
      .field('independence', 'filhote')
      .field('name', 'filhote')
      .field('requirements', [
        'filhote',
        'filhote 2',
        'filhote 3 ',
        'filhote 4',
        'filhote 5',
        'filhote 6 ',
        'filhote 7',
        'filhote 8',
      ])
      .field('city_id', cityTest.id)

    const quantityPets = await prisma.pet.findMany({
      where: {
        city_id: cityTest.id,
      },
    })
    const quantityPetsRequirements = await prisma.requirements.findMany({})

    expect(quantityPets).toHaveLength(1)

    expect(quantityPetsRequirements).toHaveLength(8)
    expect(data.status).toEqual(201)
  })
})

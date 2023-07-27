import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { City, State } from '@prisma/client'

let stateTest: State
let cityTest: City

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
  })
  afterEach(async () => {
    await app.close()
  })

  it('should create an state', async () => {
    const data = await request(app.server).post('/organizations').send({
      name: 'John Doe Organization',
      email: 'johndoe@gmail.com',
      password: '123456789',
      address: 'street',
      cep: '22020202',
      number: '179',
      phone: '12345678946',
      city_id: cityTest.id,
    })

    expect(data.body.message).toEqual('Created successfully')
    expect(data.status).toEqual(200)
  })
})

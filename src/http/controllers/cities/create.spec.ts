import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Create city(e2e)', async () => {
  beforeEach(async () => {
    await app.ready()
  })
  afterEach(async () => {
    await app.close()
  })

  it('should create an state', async () => {
    const state = await prisma.state.create({
      data: {
        name: 'rio_de_janeiro',
        uf: 'RJ',
      },
    })

    const data = await request(app.server)
      .post('/cities')
      .send({ name: 'rio_de_janeiro', stateId: state.id })

    expect(data.body.message).toEqual('City created successfully')
    expect(data.status).toEqual(201)
  })
})

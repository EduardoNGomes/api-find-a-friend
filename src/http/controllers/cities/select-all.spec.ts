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

    for (let i = 1; i <= 2; i++) {
      await prisma.city.create({
        data: {
          name: `City ${i}`,
          state_id: state.id,
        },
      })
    }

    const data = await request(app.server).get(`/cities/${state.id}`).send({})

    expect(data.body.cities).toEqual([
      expect.objectContaining({
        name: 'City 1',
      }),
      expect.objectContaining({
        name: 'City 2',
      }),
    ])
    expect(data.body.cities).toHaveLength(2)
    expect(data.status).toEqual(200)
  })
})

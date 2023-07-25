import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create state(e2e)', async () => {
  beforeEach(async () => {
    await app.ready()
  })
  afterEach(async () => {
    await app.close()
  })

  it('should create an state', async () => {
    const data = await request(app.server)
      .post('/states')
      .send({ name: 'rio_de_janeiro' })

    expect(data.body.message).toEqual('State Created')
    expect(data.status).toEqual(201)
  })
})

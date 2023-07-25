import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function statesRoutes(app: FastifyInstance) {
  app.post('/states', create)
}

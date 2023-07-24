import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function citiesRoutes(app: FastifyInstance) {
  app.post('/states', create)
}

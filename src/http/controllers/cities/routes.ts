import { FastifyInstance } from 'fastify'
import { create } from './create'
import { selectAll } from './select-all'

export async function citiesRoutes(app: FastifyInstance) {
  app.post('/cities', create)
  app.get('/cities/:stateId', selectAll)
}

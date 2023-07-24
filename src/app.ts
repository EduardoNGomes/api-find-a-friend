import fastify from 'fastify'
import { citiesRoutes } from './http/controllers/cities/routes'

export const app = fastify()

app.register(citiesRoutes)

import { FastifyInstance } from 'fastify'
import { create } from './create'

import multer from 'fastify-multer'
import { verifyJwt } from '@/http/middleware/verify-jwt'
import { deletePet } from './delete'
import { selectOne } from './select-one'
import { selectAllByCity } from './select-all-by-city'
import { selectAllByOrgs } from './select-all-by-orgs'
const upload = multer({ dest: '../../../../tmp' })
export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    { preHandler: upload.single('image'), onRequest: [verifyJwt] },
    create,
  )

  app.delete('/pets/:id', { onRequest: [verifyJwt] }, deletePet)

  app.get('/pets/:id', selectOne)
  app.post('/pets/city/:cityId', selectAllByCity)
  app.post('/pets/org/:organizationId', selectAllByOrgs)
}

import { makeCreateStatesService } from '@/services/@factory/states/create'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createService = makeCreateStatesService()
}

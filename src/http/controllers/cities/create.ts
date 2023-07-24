import { InvalidStateError } from '@/services/@errors/invalid-state-error'
import { makeCreateCitiesService } from '@/services/@factory/cities/create'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCityBodySchema = z.object({
    name: z.string(),
    stateId: z.string().uuid(),
  })

  const { name, stateId } = createCityBodySchema.parse(request.body)
  const createService = makeCreateCitiesService()

  try {
    await createService.execute({
      name,
      state_id: stateId,
    })
  } catch (error) {
    if (error instanceof InvalidStateError) {
      return reply.status(409).send(error.message)
    }
  }

  return reply.status(201).send({
    message: 'City created successfully',
  })
}

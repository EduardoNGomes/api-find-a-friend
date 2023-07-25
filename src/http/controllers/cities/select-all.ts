import { InvalidStateError } from '@/services/@errors/invalid-state-error'
import { makeSelectAllCitiesService } from '@/services/@factory/cities/select-all'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function selectAll(request: FastifyRequest, reply: FastifyReply) {
  console.log(request.body)
  const createCityBodySchema = z.object({
    stateId: z.string().uuid(),
  })
  const { stateId } = createCityBodySchema.parse(request.params)
  const selectAll = makeSelectAllCitiesService()

  try {
    const cities = await selectAll.execute({
      stateId,
    })
    return reply.send(cities)
  } catch (error) {
    if (error instanceof InvalidStateError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}

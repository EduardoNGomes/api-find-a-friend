import { InvalidDataEntryError } from '@/services/@errors/invalid-data-entry-error'
import { makeDeletePetService } from '@/services/@factory/pet/delete'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deletePet(request: FastifyRequest, reply: FastifyReply) {
  const deletePetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deletePetParamsSchema.parse(request.params)

  const deletePet = makeDeletePetService()

  try {
    const { message } = await deletePet.execute({
      id,
    })

    return reply.status(200).send(message)
  } catch (error) {
    if (error instanceof InvalidDataEntryError) {
      return reply.status(409).send(error.message)
    }
  }
}

import { InvalidDataEntryError } from '@/services/@errors/invalid-data-entry-error'
import { makeSelectOnePetService } from '@/services/@factory/pet/select-one'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function selectOne(request: FastifyRequest, reply: FastifyReply) {
  const selectOneSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = selectOneSchema.parse(request.params)

  const selectOne = makeSelectOnePetService()

  try {
    const { pet } = await selectOne.execute({
      id,
    })
    return reply.status(200).send(pet)
  } catch (error) {
    if (error instanceof InvalidDataEntryError) {
      return reply.status(409).send(error.message)
    }
  }
}

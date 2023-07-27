import { InvalidDataEntryError } from '@/services/@errors/invalid-data-entry-error'
import { makeCreatePetService } from '@/services/@factory/pet/create'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    age: z.string(),
    description: z.string(),
    energy: z.string(),
    environment: z.string(),
    height: z.string(),
    independence: z.string(),
    name: z.string(),
    city_id: z.string(),
    requirements: z.array(z.string()).optional(),
  })

  const {
    age,
    description,
    energy,
    environment,
    height,
    independence,
    name,
    city_id,
    requirements,
  } = createPetBodySchema.parse(request.body)

  const image = request.file.filename

  const create = makeCreatePetService()
  try {
    const { pet } = await create.execute({
      age,
      description,
      energy,
      environment,
      height,
      independence,
      name,
      city_id,
      image,
      organization_id: request.user.sign.sub,
      requirements: requirements || undefined,
    })
    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof InvalidDataEntryError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}

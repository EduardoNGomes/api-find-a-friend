import { InvalidDataEntryError } from '@/services/@errors/invalid-data-entry-error'
import { InvalidOrganizationAlreadyExistError } from '@/services/@errors/invalid-organization-already-exists-error'
import { makeCreateOrganizationService } from '@/services/@factory/organization/create'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    address: z.string(),
    cep: z.string(),
    number: z.string(),
    phone: z.string().min(8),
    city_id: z.string().uuid(),
  })

  const { name, email, phone, cep, address, number, password, city_id } =
    createOrganizationBodySchema.parse(request.body)

  const create = makeCreateOrganizationService()

  try {
    await create.execute({
      name,
      email,
      phone,
      cep,
      address,
      number,
      password,
      city_id,
    })
    return reply.status(200).send({ message: 'Created successfully' })
  } catch (error) {
    if (
      error instanceof InvalidOrganizationAlreadyExistError ||
      error instanceof InvalidDataEntryError
    ) {
      return reply.status(409).send(error.message)
    }
  }
}

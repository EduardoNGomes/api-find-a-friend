import { makeSelectAllPetByCityService } from '@/services/@factory/pet/select-all-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function selectAllByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const selectAllByOrgParamsSchema = z.object({
    cityId: z.string().uuid(),
  })

  const selectAllByOrgBodySchema = z.object({
    page: z.coerce.number(),
    searchType: z.enum(['age', 'energy', 'height', 'environment']).optional(),
    query: z.string().optional(),
  })

  const { cityId } = selectAllByOrgParamsSchema.parse(request.params)
  const { page, query, searchType } = selectAllByOrgBodySchema.parse(
    request.body,
  )
  const selectAllByOrgs = makeSelectAllPetByCityService()

  try {
    const { pets } = await selectAllByOrgs.execute({
      cityId,
      page,
      query: query || undefined,
      searchType: searchType || undefined,
    })

    return reply.status(200).send(pets)
  } catch (error) {
    return reply.status(500).send('Internal Server Error')
  }
}

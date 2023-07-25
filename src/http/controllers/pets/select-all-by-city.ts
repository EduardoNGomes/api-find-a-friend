import { makeSelectAllPetByCityService } from '@/services/@factory/pet/select-all-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function selectAllByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const selectAllByOrgSchema = z.object({
    cityId: z.string().uuid(),
    page: z.coerce.number(),
    searchType: z.enum(['age', 'energy', 'height', 'environment']).nullable(),
    query: z.string().nullable(),
  })

  const { cityId, page, query, searchType } = selectAllByOrgSchema.parse(
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

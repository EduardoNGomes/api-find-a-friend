import { makeSelectAllPetByOrgService } from '@/services/@factory/pet/select-all-by-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function selectAllByOrgs(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const selectAllByOrgSchema = z.object({
    organizationId: z.string().uuid(),
    page: z.coerce.number(),
    searchType: z.enum(['age', 'energy', 'height', 'environment']).nullable(),
    query: z.string().nullable(),
  })

  const { organizationId, page, query, searchType } =
    selectAllByOrgSchema.parse(request.body)

  const selectAllByOrgs = makeSelectAllPetByOrgService()

  try {
    const { pets } = await selectAllByOrgs.execute({
      organizationId,
      page,
      query: query || undefined,
      searchType: searchType || undefined,
    })

    return reply.status(200).send(pets)
  } catch (error) {
    return reply.status(500).send('Internal Server Error')
  }
}

import { makeSelectAllPetByOrgService } from '@/services/@factory/pet/select-all-by-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function selectAllByOrgs(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const selectAllByOrgParamsSchema = z.object({
    organizationId: z.string().uuid(),
  })

  const selectAllByOrgBodySchema = z.object({
    page: z.coerce.number(),
    searchType: z.enum(['age', 'energy', 'height', 'environment']).optional(),
    query: z.string().optional(),
  })

  const { page, query, searchType } = selectAllByOrgBodySchema.parse(
    request.body,
  )
  const { organizationId } = selectAllByOrgParamsSchema.parse(request.params)

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

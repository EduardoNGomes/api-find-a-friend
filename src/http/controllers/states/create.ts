import { InvalidDataEntryError } from '@/services/@errors/invalid-data-entry-error'
import { makeCreateStatesService } from '@/services/@factory/states/create'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createService = makeCreateStatesService()

  const createBodySchema = z.object({
    name: z.enum([
      'acre',
      'alagoas',
      'amapa',
      'amazonas',
      'bahia',
      'ceara',
      'espirito_santo',
      'goias',
      'maranhao',
      'mato_grosso',
      'mato_grosso_do_sul',
      'minas_gerais',
      'para',
      'paraiba',
      'parana',
      'pernambuco',
      'piaui',
      'rio_de_janeiro',
      'rio_grande_do_norte',
      'rio_grande_do_sul',
      'rondonia',
      'roraima',
      'santa_catarina',
      'sao_paulo',
      'sergipe',
      'tocantins',
    ]),
  })

  const { name } = createBodySchema.parse(request.body)

  try {
    await createService.execute({
      name,
    })
    return reply.status(201).send({ message: 'State Created' })
  } catch (error) {
    if (error instanceof InvalidDataEntryError) {
      return reply.status(500).send({ message: error.message })
    }
  }
}

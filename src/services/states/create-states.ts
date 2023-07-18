import { StatesRepository } from '@/repositories/statesRepository'
import { getUf } from '@/utils/selectUF'
import { State } from '@prisma/client'
import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'

interface CreateStateRequest {
  name:
    | 'acre'
    | 'alagoas'
    | 'amapa'
    | 'amazonas'
    | 'bahia'
    | 'ceara'
    | 'espirito_santo'
    | 'goias'
    | 'maranhao'
    | 'mato_grosso'
    | 'mato_grosso_do_sul'
    | 'minas_gerais'
    | 'para'
    | 'paraiba'
    | 'parana'
    | 'pernambuco'
    | 'piaui'
    | 'rio_de_janeiro'
    | 'rio_grande_do_norte'
    | 'rio_grande_do_sul'
    | 'rondonia'
    | 'roraima'
    | 'santa_catarina'
    | 'sao_paulo'
    | 'sergipe'
    | 'tocantins'
}

interface CreateStateResponse {
  state: State
}

export class CreateStatesService {
  constructor(private statesRepository: StatesRepository) {}

  async execute({ name }: CreateStateRequest): Promise<CreateStateResponse> {
    const uf = getUf(name)

    if (!uf) {
      throw new InvalidDataEntryError()
    }

    const state = await this.statesRepository.create({ name, uf })

    return {
      state,
    }
  }
}

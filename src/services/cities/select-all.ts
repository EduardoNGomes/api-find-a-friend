import { CitiesRepository } from '@/repositories/citiesRepository'
import { StatesRepository } from '@/repositories/statesRepository'
import { City } from '@prisma/client'
import { InvalidStateError } from '../@errors/invalid-state-error'

interface SelectAllServiceRequest {
  stateId: string
}

interface SelectAllServiceResponse {
  cities: City[]
}

export class SelectAllCitiesService {
  constructor(
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository,
  ) {}

  async execute({
    stateId,
  }: SelectAllServiceRequest): Promise<SelectAllServiceResponse> {
    const state = await this.statesRepository.findById(stateId)

    if (!state) {
      throw new InvalidStateError()
    }
    const cities = await this.citiesRepository.selectAll({ state_id: stateId })

    return { cities }
  }
}

import { CitiesRepository } from '@/repositories/citiesRepository'
import { StatesRepository } from '@/repositories/statesRepository'
import { City } from '@prisma/client'
import { InvalidStateError } from '../@errors/invalid-state-error'

interface CreateCityRequest {
  name: string
  state_id: string
}
interface CreateCityResponse {
  city: City
}

export class CreateCityService {
  constructor(
    private citiesRepository: CitiesRepository,
    private statesRepository: StatesRepository,
  ) {}

  async execute({
    name,
    state_id,
  }: CreateCityRequest): Promise<CreateCityResponse> {
    const stateExists = await this.statesRepository.findById(state_id)

    if (!stateExists) {
      throw new InvalidStateError()
    }

    const city = await this.citiesRepository.create({ name, state_id })

    return {
      city,
    }
  }
}

import { StatesRepository } from '@/repositories/statesRepository'
import { State } from '@prisma/client'

interface CreateStateRequest {
  name: string
}

interface CreateStateResponse {
  state: State
}

export class CreateStatesUseCase {
  constructor(private statesRepository: StatesRepository) {}

  async execute({ name }: CreateStateRequest): Promise<CreateStateResponse> {
    const state = await this.statesRepository.create(name)

    return {
      state,
    }
  }
}

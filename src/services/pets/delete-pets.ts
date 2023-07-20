import { PetsRepository } from '@/repositories/petsRepository'
import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'

interface DeletePetsServiceRequest {
  id: string
}

interface DeletePetsServiceRequest {
  id: string
}

interface DeletePetsServiceResponse {
  message: string
}

export class DeletePetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: DeletePetsServiceRequest): Promise<DeletePetsServiceResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new InvalidDataEntryError()
    }

    const message = await this.petsRepository.delete(id)

    return {
      message,
    }
  }
}

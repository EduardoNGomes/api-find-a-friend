import { PetsRepository } from '@/repositories/petsRepository'
import { Pet } from '@prisma/client'
import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'

interface SelectOneServiceRequest {
  id: string
}

interface SelectOneServiceResponse {
  pet: Pet
}

export class SelectOneService {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    id,
  }: SelectOneServiceRequest): Promise<SelectOneServiceResponse> {
    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new InvalidDataEntryError()
    }

    return { pet }
  }
}

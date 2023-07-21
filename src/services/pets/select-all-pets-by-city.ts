import { PetsRepository } from '@/repositories/petsRepository'
import { Pet } from '@prisma/client'

interface SelectAllPetsByCityServiceRequest {
  cityId: string
  page: number
  searchType?: 'age' | 'energy' | 'height' | 'environment'
  query?: string
}
interface SelectAllPetsByCityServiceResponse {
  pets: Pet[] | []
}

export class SelectAllPetsByCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    cityId,
    page,
    searchType,
    query,
  }: SelectAllPetsByCityServiceRequest): Promise<SelectAllPetsByCityServiceResponse> {
    let pets: Pet[] | []
    if (searchType) {
      pets = await this.petsRepository.selectAllByCity({
        cityId,
        page,
        searchType,
        query,
      })
    } else {
      pets = await this.petsRepository.selectAllByCity({
        cityId,
        page,
      })
    }

    return { pets }
  }
}

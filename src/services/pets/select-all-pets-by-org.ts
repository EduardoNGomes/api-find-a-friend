import { PetsRepository } from '@/repositories/petsRepository'
import { Pet } from '@prisma/client'

interface SelectAllPetsByOrgServiceRequest {
  organizationId: string
  page: number
  searchType?: 'age' | 'energy' | 'height' | 'environment'
  query?: string
}
interface SelectAllPetsByOrgServiceResponse {
  pets: Pet[] | []
}

export class SelectAllPetsByOrgService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    organizationId,
    page,
    searchType,
    query,
  }: SelectAllPetsByOrgServiceRequest): Promise<SelectAllPetsByOrgServiceResponse> {
    let pets: Pet[] | []
    if (searchType) {
      pets = await this.petsRepository.selectAllByOrg({
        organizationId,
        page,
        searchType,
        query,
      })
    } else {
      pets = await this.petsRepository.selectAllByOrg({
        organizationId,
        page,
      })
    }

    return { pets }
  }
}

import { OrganizationsRepository } from '@/repositories/organizationsRepository'
import { PetsRepository } from '@/repositories/petsRepository'
import { Pet } from '@prisma/client'
import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'

interface SelectAllPetsServiceRequest {
  organizationId: string
  page: number
  searchType?: 'age' | 'energy' | 'height' | 'environment'
  query?: string
}
interface SelectAllPetsServiceResponse {
  pets: Pet[] | []
}

export class SelectAllPetsService {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    organizationId,
    page,
    searchType,
    query,
  }: SelectAllPetsServiceRequest): Promise<SelectAllPetsServiceResponse> {
    const organization = await this.organizationsRepository.findById({
      organization_id: organizationId,
    })

    if (!organization) {
      throw new InvalidDataEntryError()
    }

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

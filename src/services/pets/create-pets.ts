import { OrganizationsRepository } from '@/repositories/organizationsRepository'
import { PetsRepository } from '@/repositories/petsRepository'
import { RequirementsRepository } from '@/repositories/requirementsRepository'
import { Pet, Prisma } from '@prisma/client'
import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'

interface CreatePetsRequest extends Prisma.PetUncheckedCreateInput {
  requirements: string[]
}

interface CreatePetsResponse {
  pet: Pet
}

export class CreatePetsService {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
    private requirementsRepository: RequirementsRepository,
  ) {}

  async execute({
    age,
    description,
    energy,
    environment,
    height,
    image,
    independence,
    name,
    organization_id,
    id,
    requirements,
  }: CreatePetsRequest): Promise<CreatePetsResponse> {
    const organization = await this.organizationsRepository.findById({
      organization_id,
    })

    if (!organization) {
      throw new InvalidDataEntryError()
    }

    const pet = await this.petsRepository.create({
      age,
      description,
      energy,
      environment,
      height,
      image,
      independence,
      name,
      organization_id,
      id,
    })

    if (requirements) {
      requirements.forEach(async (requirement) => {
        await this.requirementsRepository.create({
          name: requirement,
          pet_id: pet.id,
        })
      })
    }

    return { pet }
  }
}
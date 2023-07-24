import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { PrismaRequirementRepository } from '@/repositories/prisma/prisma-requirement-repository'
import { CreatePetsService } from '@/services/pets/create-pets'

export function makeCreatePetService() {
  const petRepository = new PrismaPetRepository()
  const organizationRepository = new PrismaOrganizationRepository()
  const requirementRepository = new PrismaRequirementRepository()

  const create = new CreatePetsService(
    petRepository,
    organizationRepository,
    requirementRepository,
  )

  return create
}

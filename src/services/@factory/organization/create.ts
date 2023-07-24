import { PrismaCityRepository } from '@/repositories/prisma/prisma-city-repository'
import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { CreateOrganizationService } from '@/services/organization/create-organization'

export function makeCreateOrganizationService() {
  const organizationsRepository = new PrismaOrganizationRepository()
  const cityRepository = new PrismaCityRepository()

  const createOrganization = new CreateOrganizationService(
    organizationsRepository,
    cityRepository,
  )
  return createOrganization
}

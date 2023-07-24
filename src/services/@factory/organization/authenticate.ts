import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { AuthenticateOrganizationService } from '@/services/organization/authenticate-organization'

export function makeAuthenticateOrganizationService() {
  const organizationsRepository = new PrismaOrganizationRepository()

  const authenticate = new AuthenticateOrganizationService(
    organizationsRepository,
  )
  return authenticate
}

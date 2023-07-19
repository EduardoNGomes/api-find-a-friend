import { OrganizationsRepository } from '@/repositories/organizationsRepository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'

interface AuthenticateOrganizationRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationResponse {
  organization: Organization
}

export class AuthenticateOrganizationService {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationRequest): Promise<AuthenticateOrganizationResponse> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidDataEntryError()
    }

    const userIsAuthenticated = await compare(
      password,
      organization.password_hashed,
    )

    if (!userIsAuthenticated) {
      throw new InvalidDataEntryError()
    }

    return { organization }
  }
}

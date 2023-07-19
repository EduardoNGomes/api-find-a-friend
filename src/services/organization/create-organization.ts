import { CitiesRepository } from '@/repositories/citiesRepository'
import { OrganizationsRepository } from '@/repositories/organizationsRepository'
import { Organization } from '@prisma/client'
import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'
import { InvalidOrganizationAlreadyExistError } from '../@errors/invalid-organization-already-exists-error'

interface CreateCityRequest {
  name: string
  address: string
  cep: string
  email: string
  number: string
  password: string
  phone: string
  city_id: string
}

interface CreateCityResponse {
  organization: Organization
}

export class CreateOrganizationService {
  constructor(
    private organizationRepository: OrganizationsRepository,
    private cityRepository: CitiesRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    address,
    cep,
    city_id,
    number,
    phone,
  }: CreateCityRequest): Promise<CreateCityResponse> {
    const city = await this.cityRepository.findById(city_id)

    if (!city) {
      throw new InvalidDataEntryError()
    }

    const organizationExist = await this.organizationRepository.findByName(name)

    if (organizationExist) {
      throw new InvalidOrganizationAlreadyExistError()
    }

    const organization = await this.organizationRepository.create({
      name,
      email,
      password,
      address,
      cep,
      city_id,
      number,
      phone,
    })

    return { organization }
  }
}

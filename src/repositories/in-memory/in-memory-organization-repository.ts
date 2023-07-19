import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizationsRepository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async findByName(name: string) {
    const organization = this.items.find((item) => item.name === name)

    if (organization) {
      return organization
    }
    return null
  }

  async create({
    name,
    address,
    cep,
    email,
    number,
    password,
    phone,
    city_id,
  }: Prisma.OrganizationUncheckedCreateInput) {
    const organization = {
      id: randomUUID(),
      name,
      address,
      cep,
      city_id,
      email,
      number,
      password,
      phone,
    }
    this.items.push(organization)

    return organization
  }
}

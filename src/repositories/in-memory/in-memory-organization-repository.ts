import { Organization, Prisma } from '@prisma/client'
import {
  FindByEmailAndNameProps,
  FindByIdProps,
  OrganizationsRepository,
} from '../organizationsRepository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async findById({ organization_id }: FindByIdProps) {
    const organization = this.items.find((item) => item.id === organization_id)

    if (organization) {
      return organization
    }
    return null
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (organization) {
      return organization
    }
    return null
  }

  async findByEmailAndName({ email, name }: FindByEmailAndNameProps) {
    const organization = this.items.find(
      (item) => item.email === email && item.name === name,
    )

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
    password_hashed,
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
      password_hashed,
      phone,
    }
    this.items.push(organization)

    return organization
  }
}

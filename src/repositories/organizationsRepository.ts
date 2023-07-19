import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  create({
    name,
    address,
    cep,
    email,
    number,
    password,
    phone,
    city_id,
  }: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>

  findByName(name: string): Promise<Organization | null>
}

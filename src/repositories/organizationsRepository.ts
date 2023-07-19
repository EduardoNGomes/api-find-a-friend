import { Organization, Prisma } from '@prisma/client'

export interface FindByEmailAndNameProps {
  email: string
  name: string
}

export interface OrganizationsRepository {
  create({
    name,
    address,
    cep,
    email,
    number,
    password_hashed,
    phone,
    city_id,
  }: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>

  findByEmailAndName({
    email,
    name,
  }: FindByEmailAndNameProps): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
}

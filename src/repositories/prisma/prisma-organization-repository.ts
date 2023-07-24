import { Prisma } from '@prisma/client'
import {
  FindByEmailAndNameProps,
  FindByIdProps,
  OrganizationsRepository,
} from '../organizationsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationRepository implements OrganizationsRepository {
  async findById({ organization_id }: FindByIdProps) {
    const organization = await prisma.organization.findUnique({
      where: {
        id: organization_id,
      },
    })
    if (organization) {
      return organization
    }
    return null
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findFirst({
      where: { email },
    })

    if (organization) {
      return organization
    }
    return null
  }

  async findByEmailAndName({ email, name }: FindByEmailAndNameProps) {
    const organization = await prisma.organization.findFirst({
      where: { email, name },
    })

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
    const organization = await prisma.organization.create({
      data: {
        name,
        address,
        cep,
        city_id,
        email,
        number,
        password_hashed,
        phone,
      },
    })

    return organization
  }
}

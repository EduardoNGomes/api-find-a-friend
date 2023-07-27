import { Prisma } from '@prisma/client'
import {
  PetsRepository,
  SelectAllByCityProps,
  selectAllByOrgProps,
} from '../petsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetsRepository {
  async selectAllByOrg({
    organizationId,
    page,
    searchType,
    query,
  }: selectAllByOrgProps) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: organizationId,
        ...(searchType && query && { [searchType]: query }),
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async selectAllByCity({
    page,
    searchType,
    query,
    cityId,
  }: SelectAllByCityProps) {
    const pets = await prisma.pet.findMany({
      where: {
        city_id: cityId,
        ...(searchType && query && { [searchType]: query }),
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create({
    age,
    description,
    energy,
    environment,
    height,
    image,
    independence,
    name,
    organization_id,
    city_id,
  }: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        age,
        description,
        energy,
        environment,
        height,
        image,
        independence,
        name,
        organization_id,
        city_id,
      },
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: {
        organization: true,
        Requirement: true,
      },
    })

    if (!pet) {
      return null
    }

    return pet
  }

  async delete(id: string) {
    await prisma.pet.delete({
      where: {
        id,
      },
    })

    const message = 'Delete sucessfully'

    return message
  }
}

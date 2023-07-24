import { Prisma } from '@prisma/client'
import { CitiesRepository, SelectAllCitiesProps } from '../citiesRepository'
import { prisma } from '@/lib/prisma'

export class PrismaCityRepository implements CitiesRepository {
  async selectAll({ state_id }: SelectAllCitiesProps) {
    const cities = await prisma.city.findMany({ where: { state_id } })

    return cities
  }

  async findById(id: string) {
    const city = await prisma.city.findUnique({ where: { id } })

    if (!city) {
      return null
    }

    return city
  }

  async create({ name, state_id }: Prisma.CityUncheckedCreateInput) {
    const city = await prisma.city.create({
      data: {
        name,
        state_id,
      },
    })
    return city
  }
}

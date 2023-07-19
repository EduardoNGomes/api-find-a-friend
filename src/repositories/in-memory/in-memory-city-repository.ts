import { City, Prisma } from '@prisma/client'
import { CitiesRepository } from '../citiesRepository'
import { randomUUID } from 'crypto'

export class InMemoryCityRepository implements CitiesRepository {
  public items: City[] = []

  async findById(id: string) {
    const city = this.items.find((item) => item.id === id)

    if (!city) {
      return null
    }

    return city
  }

  async create({ name, state_id }: Prisma.CityUncheckedCreateInput) {
    const city = {
      id: randomUUID(),
      name,
      state_id,
    }
    this.items.push(city)

    return city
  }
}

import { City, Prisma } from '@prisma/client'

export interface CitiesRepository {
  create({ name, state_id }: Prisma.CityUncheckedCreateInput): Promise<City>
}

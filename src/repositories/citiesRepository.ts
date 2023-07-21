import { City, Prisma } from '@prisma/client'

export interface SelectAllCitiesProps {
  state_id: string
}

export interface CitiesRepository {
  create({ name, state_id }: Prisma.CityUncheckedCreateInput): Promise<City>

  findById(id: string): Promise<City | null>

  selectAll({ state_id }: SelectAllCitiesProps): Promise<City[] | []>
}

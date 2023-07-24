import { PrismaCityRepository } from '@/repositories/prisma/prisma-city-repository'
import { PrismaStateRepository } from '@/repositories/prisma/prisma-state-repository'
import { SelectAllCitiesService } from '@/services/cities/select-all'

export function makeSelectAllService() {
  const citiesRepository = new PrismaCityRepository()
  const stateRepository = new PrismaStateRepository()

  const selectAll = new SelectAllCitiesService(
    citiesRepository,
    stateRepository,
  )

  return selectAll
}

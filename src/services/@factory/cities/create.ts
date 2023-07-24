import { PrismaCityRepository } from '@/repositories/prisma/prisma-city-repository'
import { PrismaStateRepository } from '@/repositories/prisma/prisma-state-repository'
import { CreateCityService } from '@/services/cities/create-city'

export function makeCreateCitiesService() {
  const citiesRepository = new PrismaCityRepository()
  const stateRepository = new PrismaStateRepository()

  const createService = new CreateCityService(citiesRepository, stateRepository)

  return createService
}

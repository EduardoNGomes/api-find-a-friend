import { PrismaStateRepository } from '@/repositories/prisma/prisma-state-repository'
import { CreateStatesService } from '@/services/states/create-states'

export function makeCreateStatesService() {
  const stateRepository = new PrismaStateRepository()
  const createService = new CreateStatesService(stateRepository)
  return createService
}

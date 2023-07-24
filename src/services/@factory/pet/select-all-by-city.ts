import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SelectAllPetsByCityService } from '@/services/pets/select-all-pets-by-city'

export function makeSelectAllPetByCityService() {
  const petRepository = new PrismaPetRepository()
  const selectAllByCity = new SelectAllPetsByCityService(petRepository)

  return selectAllByCity
}

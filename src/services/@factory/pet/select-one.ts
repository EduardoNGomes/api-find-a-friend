import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SelectOneService } from '@/services/pets/select-one'

export function makeSelectOnePetService() {
  const petRepository = new PrismaPetRepository()
  const pet = new SelectOneService(petRepository)

  return pet
}

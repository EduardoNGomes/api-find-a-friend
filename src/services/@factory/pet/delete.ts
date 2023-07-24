import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { DeletePetsService } from '@/services/pets/delete-pets'

export function makeDeletePetService() {
  const petRepository = new PrismaPetRepository()
  const deletePet = new DeletePetsService(petRepository)

  return deletePet
}

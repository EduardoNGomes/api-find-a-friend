import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SelectAllPetsByOrgService } from '@/services/pets/select-all-pets-by-org'

export function makeSelectAllPetByOrgService() {
  const petRepository = new PrismaPetRepository()
  const selectAllByOrgs = new SelectAllPetsByOrgService(petRepository)

  return selectAllByOrgs
}

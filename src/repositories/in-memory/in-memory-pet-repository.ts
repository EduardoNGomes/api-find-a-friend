import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../petsRepository'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = []

  async create({
    age,
    description,
    energy,
    environment,
    height,
    image,
    independence,
    name,
    organization_id,
  }: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      age,
      description,
      energy,
      environment,
      height,
      image,
      independence,
      name,
      organization_id,
    }

    this.items.push(pet)

    return pet
  }
}

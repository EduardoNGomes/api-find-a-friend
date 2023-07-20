import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create({
    age,
    description,
    energy,
    environment,
    height,
    image,
    independence,
    name,
    organization_id,
  }: Prisma.PetUncheckedCreateInput): Promise<Pet>

  delete(pet_id: string): Promise<string>

  findById(id: string): Promise<Pet | null>
}

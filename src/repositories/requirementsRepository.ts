import { Prisma, Requirements } from '@prisma/client'

export interface RequirementsRepository {
  create({
    name,
    pet_id,
  }: Prisma.RequirementsUncheckedCreateInput): Promise<Requirements>
}

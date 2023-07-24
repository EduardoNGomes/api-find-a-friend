import { Prisma } from '@prisma/client'
import { RequirementsRepository } from '../requirementsRepository'
import { prisma } from '@/lib/prisma'

export class PrismaRequirementRepository implements RequirementsRepository {
  async create({ name, pet_id }: Prisma.RequirementsUncheckedCreateInput) {
    const requirement = await prisma.requirements.create({
      data: {
        name,
        pet_id,
      },
    })

    return requirement
  }

  async delete(pet_id: string) {
    await prisma.requirements.deleteMany({
      where: { pet_id },
    })
  }
}

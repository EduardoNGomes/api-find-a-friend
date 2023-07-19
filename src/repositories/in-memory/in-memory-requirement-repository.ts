import { Prisma, Requirements } from '@prisma/client'
import { RequirementsRepository } from '../requirementsRepository'
import { randomUUID } from 'crypto'

export class InMemoryRequirementRepository implements RequirementsRepository {
  public items: Requirements[] = []

  async create({ name, pet_id }: Prisma.RequirementsUncheckedCreateInput) {
    const requirement = {
      id: randomUUID(),
      name,
      pet_id,
    }
    this.items.push(requirement)

    return requirement
  }
}

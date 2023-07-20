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

  async delete(pet_id: string) {
    const filteredItems = this.items.filter((item) => item.pet_id !== pet_id)

    this.items = filteredItems
  }
}

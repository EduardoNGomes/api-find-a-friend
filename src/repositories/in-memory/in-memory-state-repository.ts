import { State } from '@prisma/client'
import { StatesOptions, StatesRepository } from '../statesRepository'
import { randomUUID } from 'crypto'

export class InMemoryStateRepository implements StatesRepository {
  public items: State[] = []
  async create({ name, uf }: StatesOptions) {
    const state = {
      id: randomUUID(),
      name,
      uf,
    }
    this.items.push(state)

    return state
  }

  async findById(id: string) {
    const state = this.items.find((item) => item.id === id)

    if (!state) {
      return null
    }

    return state
  }
}

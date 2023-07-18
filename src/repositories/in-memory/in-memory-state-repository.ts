import { State } from '@prisma/client'
import { StatesRepository } from '../statesRepository'
import { randomUUID } from 'crypto'

export class InMemoryStateRepository implements StatesRepository {
  public items: State[] = []
  async create(name: string) {
    const state = {
      id: randomUUID(),
      name,
    }
    this.items.push(state)

    return state
  }
}

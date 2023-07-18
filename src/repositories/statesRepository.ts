import { State } from '@prisma/client'

export interface StatesRepository {
  create(name: string): Promise<State>
}

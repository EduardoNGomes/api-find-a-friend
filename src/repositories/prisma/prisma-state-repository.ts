import { StatesOptions, StatesRepository } from '../statesRepository'
import { prisma } from '@/lib/prisma'

export class PrismaStateRepository implements StatesRepository {
  async create({ name, uf }: StatesOptions) {
    const state = await prisma.state.create({
      data: {
        name,
        uf,
      },
    })

    return state
  }

  async findById(id: string) {
    const state = await prisma.state.findUnique({
      where: {
        id,
      },
    })

    if (!state) {
      return null
    }

    return state
  }
}

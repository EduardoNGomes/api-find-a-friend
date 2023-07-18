import { beforeEach, describe, expect, it } from 'vitest'
import { CreateStatesUseCase } from './create-states'
import { InMemoryStateRepository } from '@/repositories/in-memory/in-memory-state-repository'

let inMemoryStateRepository: InMemoryStateRepository
let sut: CreateStatesUseCase

describe('Create State Service', () => {
  beforeEach(async () => {
    inMemoryStateRepository = new InMemoryStateRepository()
    sut = new CreateStatesUseCase(inMemoryStateRepository)
  })

  it('Should be able to create a new state', async () => {
    const { state } = await sut.execute({ name: 'Rio de Janeiro' })

    expect(state.id).toEqual(expect.any(String))
  })
})

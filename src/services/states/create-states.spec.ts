import { beforeEach, describe, expect, it } from 'vitest'
import { CreateStatesUseCase } from './create-states'
import { InMemoryStateRepository } from '@/repositories/in-memory/in-memory-state-repository'
import { InvalidDataEntryError } from '../errors/invalid-data-entry-error'

let inMemoryStateRepository: InMemoryStateRepository
let sut: CreateStatesUseCase

describe('Create State Service', () => {
  beforeEach(async () => {
    inMemoryStateRepository = new InMemoryStateRepository()
    sut = new CreateStatesUseCase(inMemoryStateRepository)
  })

  it('Should be able to create a new state', async () => {
    const { state } = await sut.execute({ name: 'rio_de_janeiro' })
    expect(state.id).toEqual(expect.any(String))
    expect(state.uf).toEqual('RJ')
  })
  it('Shouldnt be able to create a new state', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await expect(() => sut.execute({ name: 'ol' })).rejects.toBeInstanceOf(
      InvalidDataEntryError,
    )
  })
})

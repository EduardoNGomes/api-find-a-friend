import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryStateRepository } from '@/repositories/in-memory/in-memory-state-repository'
import { InMemoryCityRepository } from '@/repositories/in-memory/in-memory-city-repository'
import { InvalidStateError } from '../@errors/invalid-state-error'
import { State } from '@prisma/client'
import { SelectAllCitiesService } from './select-all'
import { randomUUID } from 'crypto'

let inMemoryCityRepository: InMemoryCityRepository
let inMemoryStateRepository: InMemoryStateRepository

let sut: SelectAllCitiesService

let state: State

describe('Select All Cities Service', () => {
  beforeEach(async () => {
    inMemoryCityRepository = new InMemoryCityRepository()
    inMemoryStateRepository = new InMemoryStateRepository()

    sut = new SelectAllCitiesService(
      inMemoryCityRepository,
      inMemoryStateRepository,
    )

    state = await inMemoryStateRepository.create({
      name: 'rio_de_janeiro',
      uf: 'RJ',
    })

    for (let i = 1; i <= 10; i++) {
      await inMemoryCityRepository.create({
        name: `City-${i}`,
        id: randomUUID(),
        state_id: state.id,
      })
    }
  })

  it('Should be able to select all city in an exists State', async () => {
    const { cities } = await sut.execute({ stateId: state.id })

    expect(cities).toHaveLength(10)
  })

  it('Shouldnt be able to select cities with invalid state', async () => {
    await expect(() =>
      sut.execute({ stateId: randomUUID() }),
    ).rejects.toBeInstanceOf(InvalidStateError)
  })
})

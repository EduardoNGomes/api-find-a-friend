import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryStateRepository } from '@/repositories/in-memory/in-memory-state-repository'
import { InMemoryCityRepository } from '@/repositories/in-memory/in-memory-city-repository'
import { CreateCityService } from './create-city'
import { InvalidStateError } from '../@errors/invalid-state-error'
import { State } from '@prisma/client'

let inMemoryCityRepository: InMemoryCityRepository
let inMemoryStateRepository: InMemoryStateRepository

let sut: CreateCityService
let state: State

describe('Create City Service', () => {
  beforeEach(async () => {
    inMemoryCityRepository = new InMemoryCityRepository()
    inMemoryStateRepository = new InMemoryStateRepository()

    sut = new CreateCityService(inMemoryCityRepository, inMemoryStateRepository)

    state = await inMemoryStateRepository.create({
      name: 'rio_de_janeiro',
      uf: 'RJ',
    })
  })

  it('Should be able to create a new city in an exists State', async () => {
    const { city } = await sut.execute({
      name: 'Rio de Janeiro',
      state_id: state.id,
    })

    expect(city.id).toEqual(expect.any(String))
  })

  it('Shouldnt be able to create a city withou an exist State', async () => {
    await expect(() =>
      sut.execute({ name: 'ol', state_id: 'as' }),
    ).rejects.toBeInstanceOf(InvalidStateError)
  })
})

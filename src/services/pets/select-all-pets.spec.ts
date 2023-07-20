import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryStateRepository } from '@/repositories/in-memory/in-memory-state-repository'
import { InMemoryCityRepository } from '@/repositories/in-memory/in-memory-city-repository'
import { City, Organization, State } from '@prisma/client'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { randomUUID } from 'crypto'
import { SelectAllPetsService } from './select-all-pets'

let inMemoryCityRepository: InMemoryCityRepository
let inMemoryStateRepository: InMemoryStateRepository
let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let inMemoryPetRepository: InMemoryPetRepository

// MOCK
let stateTest: State
let cityTest: City
let organizationTest: Organization

let sut: SelectAllPetsService

describe('Select all Pet Service', () => {
  beforeEach(async () => {
    // MOCK
    inMemoryStateRepository = new InMemoryStateRepository()
    inMemoryCityRepository = new InMemoryCityRepository()
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()

    inMemoryPetRepository = new InMemoryPetRepository()

    sut = new SelectAllPetsService(
      inMemoryPetRepository,
      inMemoryOrganizationRepository,
    )

    stateTest = await inMemoryStateRepository.create({
      name: 'rio_de_janeiro',
      uf: 'RJ',
    })

    cityTest = await inMemoryCityRepository.create({
      name: 'Rio de Janeiro',
      state_id: stateTest.id,
    })

    organizationTest = await inMemoryOrganizationRepository.create({
      name: 'Ong do Eduardo',
      address: 'rua marechal terra',
      cep: '22765080',
      city_id: cityTest.id,
      email: 'johndoe@email.com',
      number: '179',
      password_hashed: await hash('123456', 6),
      phone: '1789',
    })

    for (let i = 1; i <= 21; i++) {
      if (i <= 20) {
        await inMemoryPetRepository.create({
          id: randomUUID(),
          age: 'Test age',
          description: 'Test description',
          energy: 'Test energy',
          environment: 'Test environment',
          height: 'Test height',
          image: 'Test image',
          independence: 'Test indepence',
          name: `Rita-${i}`,
          organization_id: organizationTest.id,
        })
      } else {
        await inMemoryPetRepository.create({
          id: randomUUID(),
          age: '1',
          description: 'Test description',
          energy: 'Test energy',
          environment: 'Test environment',
          height: 'Test height',
          image: 'Test image',
          independence: 'Test indepence',
          name: `Gabriel-${i}`,
          organization_id: organizationTest.id,
        })
      }
    }
  })

  it('Should be able to select the first twenty pets', async () => {
    const { pets } = await sut.execute({
      organizationId: organizationTest.id,
      page: 1,
    })

    expect(pets).toHaveLength(20)
  })
  it('Should be able to select one pet ', async () => {
    const { pets } = await sut.execute({
      organizationId: organizationTest.id,
      page: 2,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Gabriel-21' })])
  })
  it('Should be able to create a new Pet in an organization with many requirements ', async () => {
    const { pets } = await sut.execute({
      organizationId: organizationTest.id,
      page: 1,
      searchType: 'age',
      query: '1',
    })

    expect(pets).toEqual([expect.objectContaining({ name: 'Gabriel-21' })])
    expect(pets).toHaveLength(1)
  })

  it('Shouldnt be able to authenticate a organization with wrong password', async () => {
    await expect(async () =>
      sut.execute({
        organizationId: randomUUID(),
        page: 1,
      }),
    ).rejects.toBeInstanceOf(InvalidDataEntryError)
  })
})

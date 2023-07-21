import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryStateRepository } from '@/repositories/in-memory/in-memory-state-repository'
import { InMemoryCityRepository } from '@/repositories/in-memory/in-memory-city-repository'
import { City, Organization, Pet, State } from '@prisma/client'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { randomUUID } from 'crypto'
import { SelectOneService } from './select-one'

let inMemoryCityRepository: InMemoryCityRepository
let inMemoryStateRepository: InMemoryStateRepository
let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let inMemoryPetRepository: InMemoryPetRepository

// MOCK
let stateTest: State
let cityTest: City
let organizationTest: Organization
let petTest: Pet

// TEST
let sut: SelectOneService

describe('Select unique Pet Service', () => {
  beforeEach(async () => {
    // MOCK
    inMemoryStateRepository = new InMemoryStateRepository()
    inMemoryCityRepository = new InMemoryCityRepository()
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()

    // TEST
    inMemoryPetRepository = new InMemoryPetRepository()

    sut = new SelectOneService(inMemoryPetRepository)

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

    petTest = await inMemoryPetRepository.create({
      id: randomUUID(),
      age: 'Test age',
      description: 'Test description',
      energy: 'Test energy',
      environment: 'Test environment',
      height: 'Test height',
      image: 'Test image',
      independence: 'Test indepence',
      name: 'Rita',
      organization_id: organizationTest.id,
    })
  })

  it('Should be able to select a Pet ', async () => {
    const { pet } = await sut.execute({
      id: petTest.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: petTest.id,
        age: 'Test age',
        description: 'Test description',
        energy: 'Test energy',
        environment: 'Test environment',
        height: 'Test height',
        image: 'Test image',
        independence: 'Test indepence',
        name: 'Rita',
        organization_id: organizationTest.id,
      }),
    )
  })

  it('Shouldnt be able to a non-exist pet ', async () => {
    await expect(async () =>
      sut.execute({
        id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(InvalidDataEntryError)
  })
})

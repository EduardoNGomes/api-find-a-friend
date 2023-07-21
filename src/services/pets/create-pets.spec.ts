import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryStateRepository } from '@/repositories/in-memory/in-memory-state-repository'
import { InMemoryCityRepository } from '@/repositories/in-memory/in-memory-city-repository'
import { City, Organization, State } from '@prisma/client'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'
import { hash } from 'bcryptjs'
import { CreatePetsService } from './create-pets'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryRequirementRepository } from '@/repositories/in-memory/in-memory-requirement-repository'
import { randomUUID } from 'crypto'

let inMemoryCityRepository: InMemoryCityRepository
let inMemoryStateRepository: InMemoryStateRepository
let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let inMemoryPetRepository: InMemoryPetRepository
let inMemoryRequirementRepository: InMemoryRequirementRepository

// Just test
let stateTest: State
let cityTest: City
let organizationTest: Organization

let sut: CreatePetsService

describe('Create Pet Service', () => {
  beforeEach(async () => {
    // Just test
    inMemoryStateRepository = new InMemoryStateRepository()
    inMemoryCityRepository = new InMemoryCityRepository()
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()

    inMemoryRequirementRepository = new InMemoryRequirementRepository()

    inMemoryPetRepository = new InMemoryPetRepository()

    sut = new CreatePetsService(
      inMemoryPetRepository,
      inMemoryOrganizationRepository,
      inMemoryRequirementRepository,
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
  })

  it('Should be able to create a new Pet in an organization without requirements ', async () => {
    const { pet } = await sut.execute({
      age: 'Test age',
      description: 'Test description',
      energy: 'Test energy',
      environment: 'Test environment',
      height: 'Test height',
      image: 'Test image',
      independence: 'Test indepence',
      name: 'Rita',
      organization_id: organizationTest.id,
      city_id: cityTest.id,
      requirements: [''],
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  it('Should be able to create a new Pet in an organization with many requirements ', async () => {
    await sut.execute({
      age: 'Test age',
      description: 'Test description',
      energy: 'Test energy',
      environment: 'Test environment',
      height: 'Test height',
      image: 'Test image',
      independence: 'Test indepence',
      name: 'Rita',
      organization_id: organizationTest.id,
      requirements: ['test 1', 'test 2', 'test 3'],
      city_id: cityTest.id,
    })

    expect(inMemoryRequirementRepository.items).toHaveLength(3)
  })

  it('Shouldnt be able to authenticate a organization with wrong password', async () => {
    await expect(async () =>
      sut.execute({
        age: 'Test age',
        description: 'Test description',
        energy: 'Test energy',
        environment: 'Test environment',
        height: 'Test height',
        image: 'Test image',
        independence: 'Test indepence',
        name: 'Rita',
        organization_id: randomUUID(),
        city_id: cityTest.id,
        requirements: ['test 1', 'test 2', 'test 3'],
      }),
    ).rejects.toBeInstanceOf(InvalidDataEntryError)
  })
})

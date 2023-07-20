import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryStateRepository } from '@/repositories/in-memory/in-memory-state-repository'
import { InMemoryCityRepository } from '@/repositories/in-memory/in-memory-city-repository'
import { City, Organization, Pet, State } from '@prisma/client'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'
import { hash } from 'bcryptjs'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryRequirementRepository } from '@/repositories/in-memory/in-memory-requirement-repository'
import { randomUUID } from 'crypto'
import { DeletePetsService } from './delete-pets'

let inMemoryCityRepository: InMemoryCityRepository
let inMemoryStateRepository: InMemoryStateRepository
let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let inMemoryPetRepository: InMemoryPetRepository
let inMemoryRequirementRepository: InMemoryRequirementRepository

// MOCK
let stateTest: State
let cityTest: City
let organizationTest: Organization
let petTest: Pet

// TEST
let sut: DeletePetsService

describe('Delete Pet Service', () => {
  beforeEach(async () => {
    // MOCK
    inMemoryStateRepository = new InMemoryStateRepository()
    inMemoryCityRepository = new InMemoryCityRepository()
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
    inMemoryRequirementRepository = new InMemoryRequirementRepository()

    // TEST
    inMemoryPetRepository = new InMemoryPetRepository()

    sut = new DeletePetsService(inMemoryPetRepository)

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

    for (let i = 1; i <= 10; i++) {
      await inMemoryRequirementRepository.create({
        name: `req${i}`,
        pet_id: petTest.id,
        id: randomUUID(),
      })
    }
  })

  it('Should be able to delete a Pet in and yours requirements', async () => {
    const { message } = await sut.execute({
      id: petTest.id,
    })

    expect(inMemoryRequirementRepository.items).toHaveLength(10)
    expect(message).toEqual('Delete sucessfully')
    expect(inMemoryPetRepository.items).toHaveLength(0)

    await inMemoryRequirementRepository.delete(petTest.id)
    expect(inMemoryRequirementRepository.items).toHaveLength(0)
  })

  it('Shouldnt be able to delete a pet with wrong id', async () => {
    await expect(async () =>
      sut.execute({
        id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(InvalidDataEntryError)
  })
})

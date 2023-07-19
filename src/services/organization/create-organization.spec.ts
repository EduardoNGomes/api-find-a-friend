import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryStateRepository } from '@/repositories/in-memory/in-memory-state-repository'
import { InMemoryCityRepository } from '@/repositories/in-memory/in-memory-city-repository'
import { City, State } from '@prisma/client'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { CreateOrganizationService } from './create-organization'
import { InvalidOrganizationAlreadyExistError } from '../@errors/invalid-organization-already-exists-error'
import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'
import { randomUUID } from 'crypto'

let inMemoryCityRepository: InMemoryCityRepository
let inMemoryStateRepository: InMemoryStateRepository
let inMemoryOrganizationRepository: InMemoryOrganizationRepository

// Just test
let state: State
let city: City

let sut: CreateOrganizationService

describe('Create Organization Service', () => {
  beforeEach(async () => {
    // Just test
    inMemoryStateRepository = new InMemoryStateRepository()
    inMemoryCityRepository = new InMemoryCityRepository()
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()

    sut = new CreateOrganizationService(
      inMemoryOrganizationRepository,
      inMemoryCityRepository,
    )

    state = await inMemoryStateRepository.create({
      name: 'rio_de_janeiro',
      uf: 'RJ',
    })

    city = await inMemoryCityRepository.create({
      name: 'Rio de Janeiro',
      state_id: state.id,
    })
  })

  it('Should be able to create a new organization in an exists City', async () => {
    const { organization } = await sut.execute({
      name: 'Ong do Eduardo',
      address: 'rua marechal terra',
      cep: '22765080',
      city_id: city.id,
      email: 'johndoe@email.com',
      number: '179',
      password: '789654123',
      phone: '1789',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('Shouldnt be able to create a new organization if the name already exist', async () => {
    await sut.execute({
      name: 'Ong do Eduardo',
      address: 'rua marechal terra',
      cep: '22765080',
      city_id: city.id,
      email: 'johndoe@email.com',
      number: '179',
      password: '789654123',
      phone: '1789',
    })
    await expect(() =>
      sut.execute({
        name: 'Ong do Eduardo',
        address: 'rua marechal terra',
        cep: '22765080',
        city_id: city.id,
        email: 'johndoe@email.com',
        number: '179',
        password: '789654123',
        phone: '1789',
      }),
    ).rejects.toBeInstanceOf(InvalidOrganizationAlreadyExistError)
  })

  it('Shouldnt be able to create a new organization if the name already exist', async () => {
    const city_id = randomUUID()
    await expect(() =>
      sut.execute({
        name: 'Ong do Eduardo',
        address: 'rua marechal terra',
        cep: '22765080',
        city_id,
        email: 'johndoe@email.com',
        number: '179',
        password: '789654123',
        phone: '1789',
      }),
    ).rejects.toBeInstanceOf(InvalidDataEntryError)
  })
})

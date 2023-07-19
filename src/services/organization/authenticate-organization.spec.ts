import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryStateRepository } from '@/repositories/in-memory/in-memory-state-repository'
import { InMemoryCityRepository } from '@/repositories/in-memory/in-memory-city-repository'
import { City, State } from '@prisma/client'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

import { InvalidDataEntryError } from '../@errors/invalid-data-entry-error'
import { AuthenticateOrganizationService } from './authenticate-organization'
import { hash } from 'bcryptjs'

let inMemoryCityRepository: InMemoryCityRepository
let inMemoryStateRepository: InMemoryStateRepository
let inMemoryOrganizationRepository: InMemoryOrganizationRepository

// Just test
let stateTest: State
let cityTest: City

let sut: AuthenticateOrganizationService

describe('Create Organization Service', () => {
  beforeEach(async () => {
    // Just test
    inMemoryStateRepository = new InMemoryStateRepository()
    inMemoryCityRepository = new InMemoryCityRepository()
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()

    sut = new AuthenticateOrganizationService(inMemoryOrganizationRepository)

    stateTest = await inMemoryStateRepository.create({
      name: 'rio_de_janeiro',
      uf: 'RJ',
    })

    cityTest = await inMemoryCityRepository.create({
      name: 'Rio de Janeiro',
      state_id: stateTest.id,
    })

    await inMemoryOrganizationRepository.create({
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

  it('Should be able to authenticate an exist organization ', async () => {
    const { organization } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(organization).toEqual(
      expect.objectContaining({
        email: 'johndoe@email.com',
      }),
    )
  })

  it('Shouldnt be able to authenticate a organization with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@email.com',
        password: 'wrongPasswordTest',
      }),
    ).rejects.toBeInstanceOf(InvalidDataEntryError)
  })
  it('Shouldnt be able to authenticate a organization with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrongEmailTest@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidDataEntryError)
  })
})

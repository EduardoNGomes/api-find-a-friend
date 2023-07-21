import { Pet, Prisma } from '@prisma/client'
import {
  PetsRepository,
  SelectAllByCityProps,
  selectAllByOrgProps,
} from '../petsRepository'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = []

  async selectAllByOrg({
    organizationId,
    page,
    searchType,
    query,
  }: selectAllByOrgProps) {
    const pets = this.items
      .filter((item) => item.organization_id === organizationId)
      .filter((item) =>
        searchType
          ? item[searchType] === query
          : item.organization_id === organizationId,
      )
      .slice((page - 1) * 20, page * 20)

    return pets
  }

  async selectAllByCity({
    page,
    searchType,
    query,
    cityId,
  }: SelectAllByCityProps) {
    const pets = this.items
      .filter((item) => item.city_id === cityId)
      .filter((item) =>
        searchType ? item[searchType] === query : item.city_id === cityId,
      )
      .slice((page - 1) * 20, page * 20)

    return pets
  }

  async create({
    age,
    description,
    energy,
    environment,
    height,
    image,
    independence,
    name,
    organization_id,
    city_id,
  }: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      age,
      description,
      energy,
      environment,
      height,
      image,
      independence,
      name,
      organization_id,
      city_id,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async delete(id: string) {
    const filteredItems = this.items.filter((item) => item.id !== id)

    this.items = filteredItems
    const message = 'Delete sucessfully'

    return message
  }
}

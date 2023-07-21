import { Pet, Prisma } from '@prisma/client'

export interface selectAllByOrgProps {
  organizationId: string
  page: number
  searchType?: 'age' | 'energy' | 'height' | 'environment'
  query?: string
}
export interface SelectAllByCityProps {
  cityId: string
  page: number
  searchType?: 'age' | 'energy' | 'height' | 'environment'
  query?: string
}

export interface PetsRepository {
  create({
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
  }: Prisma.PetUncheckedCreateInput): Promise<Pet>

  // DELETE in CASCADE Requirements
  delete(pet_id: string): Promise<string>

  // FIND pet with REQUIREMENTS
  findById(id: string): Promise<Pet | null>

  selectAllByOrg({
    organizationId,
    page,
    query,
    searchType,
  }: selectAllByOrgProps): Promise<Pet[] | []>

  selectAllByCity({
    cityId,
    page,
    query,
    searchType,
  }: SelectAllByCityProps): Promise<Pet[] | []>
}

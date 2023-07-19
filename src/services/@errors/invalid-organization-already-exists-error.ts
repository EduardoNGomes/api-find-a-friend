export class InvalidOrganizationAlreadyExistError extends Error {
  constructor() {
    super('This organization already exists')
  }
}

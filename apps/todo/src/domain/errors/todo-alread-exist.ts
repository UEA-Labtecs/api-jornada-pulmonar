export class TodoAlreadExistTodosError extends Error {
  constructor () {
    super('Todo Alread Exist')
    this.name = 'TodoAlreadExistTodosError'
    this.message = 'Todo com esse Titulo já existe.'
  }
}

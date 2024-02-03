export class TodoNotExistTodosError extends Error {
  constructor () {
    super('Todo Not Exist')
    this.name = 'TodoNotExistTodosError'
    this.message = 'Todo com esse ID não existe.'
  }
}

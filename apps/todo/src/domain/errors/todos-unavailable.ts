export class ListTodosError extends Error {
  constructor () {
    super('Not Found Todos')
    this.name = 'ListTodosError'
  }
}

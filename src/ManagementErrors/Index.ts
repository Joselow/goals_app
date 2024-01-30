export class DatabaseError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}
export class RequestError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'RequestError'
  }
}
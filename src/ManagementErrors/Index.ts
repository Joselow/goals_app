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

export class ValidationError extends Error {
  public errors: any;
  constructor(errors: any, message: string = 'Validation error occurred') {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

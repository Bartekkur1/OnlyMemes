export class UploadMemeError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotAuthorizedError extends Error {
  constructor(message: string) {
    super(message);
  }
}
export class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(`Invalid credentials! ${message}`);
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

export class InvalidInviteTokenError extends Error {
  constructor() {
    super('Invalid invite token');
  }
}
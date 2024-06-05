export class InvalidCredentialsError extends Error {
  constructor() {
    super(`Invalid email or password!`);
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

export class InvalidInviteTokenError extends Error {
  constructor() {
    super('Invite token is invalid, or token has already been used');
  }
}

export class EmailTakenError extends Error {
  constructor() {
    super('Email is already taken');
  }
}
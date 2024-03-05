export interface IdentityConfiguration {
  JWTSecret: string;
}

export interface UserProfile {
  displayName: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserIdentity {
  credentials: Credentials;
  profile: UserProfile;
}

export interface IdentityRepository {
  findUser(credentials: Credentials): Promise<UserIdentity>;
  createUser(credentials: UserIdentity): Promise<void>;
  isEmailTaken(email: string): Promise<boolean>;
}

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

export interface JWTPayload {
  email: string;
  displayname: string;
}

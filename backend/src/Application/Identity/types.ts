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
  id: string;
  credentials: Credentials;
  profile: UserProfile;
}

export type UnregisteredUserIdentity = Omit<UserIdentity, 'id'>;

export interface IdentityRepository {
  findUser(email: string): Promise<UserIdentity>;
  createUser(credentials: UnregisteredUserIdentity): Promise<void>;
  isEmailTaken(email: string): Promise<boolean>;
}

export interface Meme {
  id: string;
  // base64 image
  content: string;
  // user id
  author: number;
  publishedDate: Date;
  title: string;
  url?: string;
}

export interface ContentRepository {
  saveMeme(meme: Meme): Promise<void>;
  deleteMeme(id: string): Promise<void>;
  findMemes(): Promise<Meme[]>;
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
  id: string;
  displayName: string;
}

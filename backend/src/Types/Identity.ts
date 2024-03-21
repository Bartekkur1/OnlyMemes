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

export interface JWTPayload {
  id: string;
  displayName: string;
}

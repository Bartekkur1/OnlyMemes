import { InviteTokenDetails } from "../Application/types";

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
  role: Role;
}

export interface RegisterForm {
  email: string;
  password: string;
  displayName: string;
  inviteToken: string;
}

export interface IdentityRepository {
  findUser(email: string): Promise<UserIdentity | undefined>;
  findUserBydId(id: number): Promise<UserIdentity | undefined>;
  registerUser(form: RegisterForm): Promise<void>;
  isEmailTaken(email: string): Promise<boolean>;
  // INVITE TOKEN
  userInviteTokenExists(userId: number): Promise<boolean>;
  findUserInviteToken(userId: number): Promise<InviteTokenDetails>;
  saveInviteToken(userId: number, token: string): Promise<void>;
  isInviteTokenValid(token: string): Promise<boolean>;
  useInviteToken(token: string): Promise<void>;
}

export interface Vote {
  id: number;
  meme: number;
  user: number;
  up: boolean;
}

export interface VoteRepository {
  createVote(): Promise<boolean>;
}

export interface JWTPayload {
  id: number;
  displayName: string;
  role: Role;
  salt: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
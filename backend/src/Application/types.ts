import type Content from "./Content/Content";
import type Identity from "./Identity/Identity";
import type Follow from './Follow/Follow';
import type Profile from "./Profile/Profile";

export class UnexpectedError extends Error {
  constructor(message: string) {
    super(`An unexpected error occurred! ${message}`);
  }
}

export class TokenAlreadyGenerated extends Error {
  constructor() {
    super('Token has already been generated for this user');
  }
}

export interface ApplicationContext {
  identity: Identity;
  content: Content;
  profile: Profile;
  follow: Follow;
}

export interface InviteTokenDetails {
  token: string;
  invites: number;
}
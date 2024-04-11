import type Content from "./Content/Content";
import type Identity from "./Identity/Identity";
import Profile from "./Profile/Profile";

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
}

export interface InviteTokenDetails {
  token: string;
  invites: number;
}
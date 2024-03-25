import type Content from "./Content/Content";
import type Identity from "./Identity/Identity";
import Profile from "./Profile/Profile";

export class UnexpectedError extends Error {
  constructor(message: string) {
    super(`An unexpected error occurred! ${message}`);
  }
}

export interface ApplicationContext {
  identity: Identity;
  content: Content;
  profile: Profile;
}

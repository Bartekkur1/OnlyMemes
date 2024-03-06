import { UnexpectedError } from "../types";
import { InvalidCredentialsError, type Credentials, type IdentityRepository, UserNotFoundError, type JWTPayload, type IdentityConfiguration, type UserIdentity } from "./types";
import { hashCredentials } from "./util";
import { validateLoginCredentials, validateRegisterUserIdentity } from "./validator";
import { sign } from 'jsonwebtoken';

// @TODO: Add business logic related logs
class Identity {

  constructor(
    private config: IdentityConfiguration,
    private repository: IdentityRepository
  ) { }

  async login(credentials: Credentials): Promise<string> {
    const errorMessage = validateLoginCredentials(credentials);
    if (errorMessage) {
      throw new InvalidCredentialsError(errorMessage);
    }

    const searchCredentials = hashCredentials(credentials);
    const user = await this.repository.findUser(searchCredentials);
    if (!user) {
      throw new UserNotFoundError();
    }

    return sign(<JWTPayload>{
      email: user.credentials.email,
      displayname: user.profile.displayName
    }, this.config.JWTSecret);
  }

  async register(identity: UserIdentity): Promise<boolean> {
    const errorMessage = validateRegisterUserIdentity(identity);
    if (errorMessage) {
      throw new InvalidCredentialsError(errorMessage);
    }

    const emailTaken = await this.repository.isEmailTaken(identity.credentials.email);
    if (emailTaken) {
      throw new InvalidCredentialsError('Email is already taken');
    }

    try {
      await this.repository.createUser({
        credentials: hashCredentials(identity.credentials),
        profile: identity.profile
      });
      return true;
    } catch (err) {
      const error = err as Error;
      throw new UnexpectedError(error.message);
    }
  }

};

export default Identity;
import { getConsoleLogger } from "../../Util/logger";
import type { Logger } from "../../Util/types";
import { UnexpectedError } from "../types";
import { InvalidCredentialsError, UserNotFoundError } from "./types";
import type { Credentials, IdentityConfiguration, IdentityRepository, JWTPayload, UserIdentity } from "./types";
import { hashCredentials } from "./util";
import { validateLoginCredentials, validateUserIdentity } from "./validator";
import { sign } from 'jsonwebtoken';

// @TODO: Add password/account recovery
class Identity {

  constructor(
    private config: IdentityConfiguration,
    private repository: IdentityRepository,
    private logger: Logger = getConsoleLogger('Identity')
  ) { }

  async login(credentials: Credentials): Promise<string> {
    this.logger.debug('Logging in user...');
    const errorMessage = validateLoginCredentials(credentials);
    if (errorMessage) {
      this.logger.error(`Invalid credentials: ${errorMessage}`);
      throw new InvalidCredentialsError(errorMessage);
    }

    const searchCredentials = hashCredentials(credentials);
    const user = await this.repository.findUser(searchCredentials.email);
    if (!user) {
      this.logger.error(`User ${searchCredentials.email} not found`);
      throw new UserNotFoundError();
    }

    if (user.credentials.password !== searchCredentials.password) {
      this.logger.error(`Invalid password for user ${searchCredentials.email}`);
      throw new InvalidCredentialsError('Invalid password');
    }

    this.logger.debug(`User ${searchCredentials.email} logged in successfully`);
    return sign(<JWTPayload>{
      email: searchCredentials.email,
      displayname: user.profile.displayName
    }, this.config.JWTSecret);
  }

  async register(identity: UserIdentity): Promise<boolean> {
    this.logger.debug('Registering user...');
    const errorMessage = validateUserIdentity(identity);
    if (errorMessage) {
      this.logger.error(`Invalid user identity: ${errorMessage}`);
      throw new InvalidCredentialsError(errorMessage);
    }

    const hashedCredentials = hashCredentials(identity.credentials);
    const emailTaken = await this.repository.isEmailTaken(hashedCredentials.email);
    if (emailTaken) {
      this.logger.error(`Email ${hashedCredentials.email} is already taken`);
      throw new InvalidCredentialsError('Email is already taken');
    }

    try {
      this.logger.debug(`Creating user ${hashedCredentials.email}...`);
      await this.repository.createUser({
        credentials: hashCredentials(identity.credentials),
        profile: identity.profile
      });
      this.logger.info(`User ${hashedCredentials.email} created successfully`);
      return true;
    } catch (err) {
      const error = err as Error;
      this.logger.error(`Error creating user: ${error.message}`);
      throw new UnexpectedError(error.message);
    }
  }

};

export default Identity;
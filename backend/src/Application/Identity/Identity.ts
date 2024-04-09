import { loadConfig } from "../../Infrastructure/config";
import { getConsoleLogger } from "../../Util/logger";
import type { Logger } from "../../Util/types";
import { UnexpectedError } from "../types";
import { hashCredentials } from "./util";
import { sign, verify } from 'jsonwebtoken';
import { validateLoginCredentials, validateUserIdentity } from '../../Infrastructure/Validation/CredentialsValidator';
import { InvalidCredentialsError, UserNotFoundError } from "./error";
import { Credentials, IdentityRepository, JWTPayload, UnregisteredUserIdentity } from "../../Types/Identity";
import { IdentityConfiguration } from './config';

// @TODO: Add password/account recovery
class Identity {

  private config: IdentityConfiguration = loadConfig<IdentityConfiguration>({
    JWTSecret: 'JWT_SECRET'
  });

  constructor(
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
      id: Number(user.id),
      displayName: user.profile.displayName
    }, this.config.JWTSecret);
  }

  async register(identity: UnregisteredUserIdentity): Promise<boolean> {
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

  // Returns true if token is valid
  verifyToken(token: string): boolean {
    this.logger.debug('Verifying token...');
    try {
      verify(token, this.config.JWTSecret);
      return true;
    } catch (err) {
      this.logger.error(`Error verifying token: ${err.message}`);
      return false;
    }
  }

};

export default Identity;
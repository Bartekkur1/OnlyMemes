import { loadConfig } from "../../Infrastructure/config";
import { getConsoleLogger } from "../../Util/logger";
import type { Logger } from "../../Util/types";
import { InviteTokenDetails, TokenAlreadyGenerated, UnexpectedError } from "../types";
import { hashCredentials, hashRegisterForm } from "./util";
import { sign, verify } from 'jsonwebtoken';
import { validateLoginCredentials, validateRegisterForm } from '../../Infrastructure/Validation/CredentialsValidator';
import { InvalidCredentialsError, InvalidInviteTokenError, UserNotFoundError } from "./error";
import { Credentials, IdentityRepository, JWTPayload, RegisterForm } from "../../Types/Identity";
import { IdentityConfiguration } from './config';
import { randomBytes } from 'crypto';
import { v4 } from "uuid";

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
      displayName: user.profile.displayName,
      role: user.role,
      salt: v4()
    }, this.config.JWTSecret);
  }

  async register(form: RegisterForm): Promise<boolean> {
    this.logger.debug('Registering user...');
    const errorMessage = validateRegisterForm(form);
    if (errorMessage) {
      this.logger.error(`Invalid user identity: ${errorMessage}`);
      throw new InvalidCredentialsError(errorMessage);
    }

    const { email, password } = form;
    const hashedCredentials = hashCredentials({ email, password });
    const emailTaken = await this.repository.isEmailTaken(hashedCredentials.email);
    if (emailTaken) {
      this.logger.error(`Email ${hashedCredentials.email} is already taken`);
      throw new InvalidCredentialsError('Email is already taken');
    }

    const tokenValid = await this.repository.isInviteTokenValid(form.inviteToken);
    if (!tokenValid) {
      throw new InvalidInviteTokenError();
    } else {
      await this.repository.useInviteToken(form.inviteToken);
    }

    try {
      this.logger.debug(`Creating user ${hashedCredentials.email}...`);
      await this.repository.registerUser(hashRegisterForm(form));
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

  async getInviteToken(userId: number): Promise<InviteTokenDetails> {
    this.logger.debug('Generating invite token...');
    const tokenExists = await this.repository.userInviteTokenExists(userId);
    if (tokenExists) {
      this.logger.error(`Invite token for user ${userId} already exists`);
      return this.repository.findUserInviteToken(userId);
    }

    const inviteToken = randomBytes(32).toString("hex");
    console.log(inviteToken);
    await this.repository.saveInviteToken(userId, inviteToken);
    this.logger.info(`Invite token for user ${userId} generated successfully`);
    return {
      token: inviteToken,
      invites: 5
    };
  }

};

export default Identity;
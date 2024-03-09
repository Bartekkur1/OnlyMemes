import type { Credentials } from "./types";
import * as crypto from 'crypto';

const createHash = (input: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}

// @TODO: Move password hash to bcrypt + salt
export const hashCredentials = (credentials: Credentials): Credentials => ({
  email: createHash(credentials.email),
  password: createHash(credentials.password)
});
import type { Request } from 'express';

export interface WebServerConfig {
  port: number;
}

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export interface AuthorizedRequest extends Request {
  user: {
    id: number;
    displayName: string;
  }
}
import type { Request } from 'express';
import { FileArray } from 'express-fileupload';
import { Role } from '../../Types/Identity';

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
    role: Role;
  }
}

export interface FileUploadRequest extends AuthorizedRequest {
  files: FileArray;
}
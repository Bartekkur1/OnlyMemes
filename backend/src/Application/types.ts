import type Identity from "./Identity/Identity";

export class UnexpectedError extends Error {
  constructor(message: string) {
    super(`An unexpected error occurred! ${message}`);
  }
}

export interface ApplicationContext {
  identity: Identity;
}
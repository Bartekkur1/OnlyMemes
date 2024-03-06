export interface WebServerConfig {
  port: number;
}

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

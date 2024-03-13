declare global {
  declare namespace Express {
    export interface Request {
      user?: {
        id: string;
        displayName: string;
      }
    }
  }
}
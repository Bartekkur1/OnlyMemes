import type { Request, Response, NextFunction } from "express";
import type Identity from "../../../Application/Identity/Identity";
import { InvalidCredentialsError, UserNotFoundError } from "../../../Application/Identity/error";
import { HttpError } from "../types";
import { UnexpectedError } from "../../../Application/types";

class IdentityHandler {

  constructor(
    private readonly identity: Identity,
  ) { }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = (req.body || {});
      const token = await this.identity.login({
        email, password
      });
      return res.json({ token });
    } catch (error) {
      if (error instanceof InvalidCredentialsError
        || error instanceof UserNotFoundError) {
        return next(new HttpError(401, error.message));
      }
      return next(error);
    }
  }

  // @TODO: Make the display name unique
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, displayName } = (req.body || {});
      await this.identity.register({
        credentials: {
          email, password
        },
        profile: {
          displayName
        }
      });
      return res.sendStatus(201);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return next(new HttpError(400, error.message));
      } else if (error instanceof UnexpectedError) {
        return next(new HttpError(500, error.message));
      }
      return next(error);
    }
  }
}

export default IdentityHandler;
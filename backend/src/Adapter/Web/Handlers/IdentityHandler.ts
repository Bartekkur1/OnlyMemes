import type { Request, Response, NextFunction } from "express";
import type Identity from "../../../Application/Identity/Identity";
import { EmailTakenError, InvalidCredentialsError, InvalidInviteTokenError, UserNotFoundError } from "../../../Application/Identity/error";
import { AuthorizedRequest, HttpError } from "../types";
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
        || error instanceof EmailTakenError
        || error instanceof UserNotFoundError) {
        return next(new HttpError(401, error.message));
      }
      return next(new HttpError(500, 'Internal server error!'));
    }
  }

  // @TODO: Make the display name unique
  // @TODO: Make display name unique case sensitive
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, displayName, inviteToken } = (req.body || {});
      await this.identity.register({
        email, password,
        displayName,
        inviteToken
      });
      return res.sendStatus(201);
    } catch (error) {
      if (error instanceof InvalidCredentialsError
        || error instanceof InvalidInviteTokenError) {
        return next(new HttpError(400, error.message));
      }
      else if (error instanceof UnexpectedError) {
        return next(new HttpError(500, error.message));
      }
      return next(new HttpError(500, 'Internal server error!'));
    }
  }

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      this.identity.verifyToken(token);
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(401);
    }
  }

  async getInviteToken(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const details = await this.identity.getInviteToken(req.user.id);
      return res.json(details);
    } catch (error) {
      if (error instanceof UnexpectedError) {
        return next(new HttpError(500, error.message));
      }
      return next(new HttpError(500, 'Internal server error!'));
    }

  }
}

export default IdentityHandler;
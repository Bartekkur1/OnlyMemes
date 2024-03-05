import type { Request, Response, NextFunction } from "express";
import type Identity from "../../../Application/Identity/Identity";

class IdentityHandler {

  constructor(private readonly identity: Identity) { }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.identity.login({
        email, password
      });
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    return res.sendStatus(200);
  }
}

export default IdentityHandler;
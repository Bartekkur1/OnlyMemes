import Profile from "../../../Application/Profile/Profile";
import type { Request, Response, NextFunction } from "express";
import { AuthorizedRequest } from "../types";

class ProfileHandler {

  constructor(private profile: Profile) { }

  async findUser(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await this.profile.findUser(req.user.id, Number(userId));
      if (!user) {
        return res.sendStatus(404);
      }
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }
}

export default ProfileHandler;

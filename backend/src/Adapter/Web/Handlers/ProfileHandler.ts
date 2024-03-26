import Profile from "../../../Application/Profile/Profile";
import type { Request, Response, NextFunction } from "express";

class ProfileHandler {

  constructor(private profile: Profile) { }

  async findUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { displayName } = req.params;
      const user = await this.profile.findUser(displayName);
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

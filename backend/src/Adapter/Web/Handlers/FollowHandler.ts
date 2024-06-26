import { NextFunction, Request, Response } from "express";
import { getConsoleLogger } from "../../../Util/logger";
import { Logger } from "../../../Util/types";
import Follow from "../../../Application/Follow/Follow";
import { AuthorizedRequest, HttpError } from "../types";

class FollowHandler {

  private logger: Logger = getConsoleLogger('FollowHandler');

  constructor(private follow: Follow) { }

  async followUser(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const { followedId } = req.params;
      const userId = req.user.id;
      this.logger.info(`User ${userId} following user ${followedId}`);
      await this.follow.followUser(userId, Number(followedId));
      return res.sendStatus(200);
    } catch (err) {
      return next(new HttpError(500, 'Internal server error!'));
    }
  }

};

export default FollowHandler;

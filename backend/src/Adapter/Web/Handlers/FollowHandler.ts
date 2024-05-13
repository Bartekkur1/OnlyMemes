import { NextFunction, Request, Response } from "express";
import { getConsoleLogger } from "../../../Util/logger";
import { Logger } from "../../../Util/types";

class FollowHandler {

  private logger: Logger = getConsoleLogger('FollowHandler');

  async followUser(req: Request, res: Response, next: NextFunction) {
    console.log('Follow user!');
    return res.sendStatus(200);
  }

};

export default FollowHandler;

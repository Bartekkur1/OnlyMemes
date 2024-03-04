import type { NextFunction, Request, Response } from "express";
import { HttpMethod, type WebHandler } from "../types";
import { Route } from "../decorator";
import Routes from "../routes";

@Route({
  method: HttpMethod.GET,
  path: Routes.health,
})
class HealthCheck implements WebHandler {

  async handler(req: Request, res: Response, next: NextFunction) {
    return res.sendStatus(200);
  }

}

export default new HealthCheck();
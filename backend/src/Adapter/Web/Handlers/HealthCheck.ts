import type { NextFunction, Request, Response } from "express";

class HealthCheck {
  async handler(req: Request, res: Response, next: NextFunction) {
    return res.sendStatus(200);
  }
}

export default HealthCheck;
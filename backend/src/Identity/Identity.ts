import type { NextFunction, Request, Response } from "express";
import type { Credentials } from "./types";

class Identity {

  public async login(credentials: Credentials): Promise<string> {

    return '';
  }

  public async register(credentials: Credentials): Promise<string> {

    return '';
  }

  public async securePathMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {

    next();
  }

};
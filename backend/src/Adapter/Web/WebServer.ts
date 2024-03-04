import express from 'express';
import { RouteSymbol } from './decorator';
import type { Request, Response, NextFunction, Express } from 'express';
import type { RouteInformation, WebHandler, WebServerConfig } from './types';

class WebServer {

  private server: Express;
  private config: WebServerConfig;

  constructor(config: WebServerConfig) {
    this.config = config;
    this.server = express();
  }

  addHandler(handler: WebHandler) {
    const ownRouteMetadata = Reflect.hasOwnMetadata(RouteSymbol, handler.constructor);
    if (!ownRouteMetadata) {
      throw new Error(`Missing handler ${handler.constructor.name} metadata!`);
    }

    const { method, path } = Reflect.getMetadata(RouteSymbol, handler.constructor) as RouteInformation;
    this.server[method](path, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await handler.handler(req, res, next);
        if (result) {
          res.send(result);
        }
      } catch (e) {
        next(e);
      }
    });
  }

  start() {
    this.server.listen(this.config.port, () => {
      console.log(`Server listening on port ${this.config.port}`);
    });
  }

}

export default WebServer;

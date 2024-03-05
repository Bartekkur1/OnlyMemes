import express from 'express';
import type { Request, Response, NextFunction, Express, Router } from 'express';
import { HttpError, type WebServerConfig } from './types';
import Routes from './routes';

// @TODO: Add rate limiter
class WebServer {

  private router: Router;
  private server: Express;
  private config: WebServerConfig;

  constructor(config: WebServerConfig) {
    this.config = config;
    this.server = express();
    this.router = express.Router();
  }

  registerRoutes(callback: (router: Router) => void) {
    callback(this.router);
  }

  private addErrorHandler() {
    this.server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err);
      if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message });
      } else {
        return res.status(500).send('Internal Server Error');
      }
    });

  }

  private addNotFoundHandler() {
    this.server.use((req: Request, res: Response, next: NextFunction) => {
      return res.status(404).send('Not Found');
    });
  }

  start() {
    this.server.use(Routes.prefix, this.router);
    this.addErrorHandler();
    this.addNotFoundHandler();
    this.server.listen(this.config.port, () => {
      console.log(`Server listening on port ${this.config.port}`);
    });
  }

}

export default WebServer;

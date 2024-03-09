import express from 'express';
import type { Request, Response, NextFunction, Express, Router } from 'express';
import { HttpError, type WebServerConfig } from './types';
import Routes from './routes';
import bodyParser from 'body-parser';
import { loadConfig } from '../../config';
import type { Logger } from '../../Util/types';
import { getConsoleLogger } from '../../Util/logger';

// @TODO: Add rate limiter
class WebServer {

  private router: Router;
  private server: Express;
  private config: WebServerConfig;
  private logger: Logger = getConsoleLogger('WebServer');

  constructor() {
    this.config = loadConfig<WebServerConfig>({
      port: 'API_PORT'
    });
    this.server = express();
    this.router = express.Router();
  }

  registerRoutes(callback: (router: Router) => void) {
    callback(this.router);
  }

  private addErrorHandler() {
    this.server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      this.logger.error(err.message);
      if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message });
      } else if (err instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON' });
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
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use((req: Request, res: Response, next: NextFunction) => {
      this.logger.debug(`Incoming request ${req.method} ${req.url}`);
      return next();
    });
    this.server.use(Routes.prefix, this.router);
    this.addErrorHandler();
    this.addNotFoundHandler();
    this.server.use((req: Request, res: Response, next: NextFunction) => {
      this.logger.debug(`Outgoing response ${res.statusCode}`);
      return next();
    });
    this.server.listen(this.config.port, () => {
      this.logger.info(`Server listening on port ${this.config.port}`);
    });
  }

}

export default WebServer;

import type { Request, Response, NextFunction } from 'express';
import { AuthorizedRequest } from '../types';

class ContentHandler {

  async uploadContent(req: AuthorizedRequest, res: Response, next: NextFunction) {
    return res.sendStatus(200);
  }

}

export default ContentHandler;

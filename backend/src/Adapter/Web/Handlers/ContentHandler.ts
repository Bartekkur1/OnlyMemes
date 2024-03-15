import type { Request, Response, NextFunction } from 'express';
import { AuthorizedRequest } from '../types';
import Content from '../../../Application/Content/Content';

class ContentHandler {

  constructor(private content: Content) { }

  async uploadContent(req: AuthorizedRequest, res: Response, next: NextFunction) {
    console.log(req.body);
    await this.content.uploadMeme({
      author: 1,
      content: req.body.image,
      id: '123',
      title: 'test meme',
      publishedDate: new Date()
    });
    return res.sendStatus(200);
  }

}

export default ContentHandler;

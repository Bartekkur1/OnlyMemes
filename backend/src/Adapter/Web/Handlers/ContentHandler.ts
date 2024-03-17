import type { Request, Response, NextFunction } from 'express';
import { AuthorizedRequest } from '../types';
import Content from '../../../Application/Content/Content';
import { v4 } from 'uuid';

class ContentHandler {

  constructor(private content: Content) { }

  // @TODO: Add validation
  // @TODO: Image as base64 is really bac idea, temporary solution
  async uploadContent(req: AuthorizedRequest, res: Response, next: NextFunction) {
    const memeId = v4();
    try {
      await this.content.uploadMeme({
        author: req.user.id,
        content: req.body.image,
        id: memeId,
        title: req.body.title,
        publishedDate: new Date()
      });
      return res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // @TODO: Add pagination
  async getMemesHomepage(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const memes = await this.content.findMemes();
      return res.json(memes).status(200);
    } catch (err) {
      return res.sendStatus(400);
    }
  }

}

export default ContentHandler;

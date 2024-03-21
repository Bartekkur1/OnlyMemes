import type { Response, NextFunction } from 'express';
import { AuthorizedRequest } from '../types';
import Content from '../../../Application/Content/Content';
import { v4 } from 'uuid';
// @TODO: Add module mapper
import { validatePagination } from '../../../Infrastructure/Validation/PaginationValidator';
import { extractPagination } from '../../../Util/pagination';

class ContentHandler {

  constructor(private content: Content) { }

  // @TODO: Add validation
  // @TODO: Image as base64 is really bac idea, temporary solution, doesn't support gifs :(
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
      const pagination = extractPagination(req);
      const paginationValidatorError = validatePagination(pagination);
      if (paginationValidatorError) {
        return res.status(400).json({ error: paginationValidatorError });
      }

      const memes = await this.content.findMemes(pagination);
      return res.json(memes).status(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

}

export default ContentHandler;

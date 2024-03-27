import type { Response, NextFunction } from 'express';
import { AuthorizedRequest } from '../types';
import Content from '../../../Application/Content/Content';
import { v4 } from 'uuid';
// @TODO: Add module mapper
import { validatePagination } from '../../../Infrastructure/Validation/PaginationValidator';
import { extractPagination } from '../../../Util/pagination';
import { Meme } from '../../../Types/Content';
import { validateMeme } from '../../../Infrastructure/Validation/UploadValidator';

class ContentHandler {

  constructor(private content: Content) { }

  // @TODO: Image as base64 is really bac idea, temporary solution, doesn't support gifs :(
  async uploadContent(req: AuthorizedRequest, res: Response, next: NextFunction) {
    const memeId = v4();
    try {
      const meme: Partial<Meme> = {
        author: req.user.id,
        content: req.body.image,
        title: req.body.title
      };
      const validationError = validateMeme(meme);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      await this.content.uploadMeme({
        id: memeId,
        publishedDate: new Date(),
        authorDisplayName: req.user.displayName,
        author: meme.author!,
        title: meme.title!,
        content: meme.content!
      });
      return res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getMemesHomepage(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const pagination = extractPagination(req);
      const paginationValidatorError = validatePagination(pagination);
      if (paginationValidatorError) {
        return res.status(400).json({ error: paginationValidatorError });
      }

      const author = req.query.author ? String(req.query.author) : undefined;
      const memes = await this.content.findMemes(pagination, author);
      return res.json(memes).status(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }

}

export default ContentHandler;

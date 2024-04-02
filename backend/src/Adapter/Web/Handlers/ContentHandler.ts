import type { Response, NextFunction } from 'express';
import { AuthorizedRequest, FileUploadRequest } from '../types';
import Content from '../../../Application/Content/Content';
import { v4 } from 'uuid';
// @TODO: Add module mapper
import { validatePagination } from '../../../Infrastructure/Validation/PaginationValidator';
import { extractPagination } from '../../../Util/pagination';
import { Meme } from '../../../Types/Content';
import { validateMeme } from '../../../Infrastructure/Validation/UploadValidator';
import { UploadedFile } from 'express-fileupload';

class ContentHandler {

  constructor(private content: Content) { }

  // @TODO: Image as base64 is really bac idea, temporary solution, doesn't support gifs :(
  async uploadContent(req: FileUploadRequest, res: Response, next: NextFunction) {
    const memeId = v4();
    try {
      const image = req.files?.image as UploadedFile;
      if (image === undefined) {
        return res.status(400).json({ error: 'No image provided' });
      }

      const title = req.body.title as string;
      if (title === undefined) {
        return res.status(400).json({ error: 'No title provided' });
      }

      console.log({
        image,
        title
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

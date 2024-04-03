import type { Response, NextFunction } from 'express';
import { AuthorizedRequest, FileUploadRequest } from '../types';
import Content from '../../../Application/Content/Content';
import { v4 } from 'uuid';
// @TODO: Add module mapper
import { validatePagination } from '../../../Infrastructure/Validation/PaginationValidator';
import { extractPagination } from '../../../Util/pagination';
import { UploadedFile } from 'express-fileupload';
import { Meme } from '../../../Types/Content';

class ContentHandler {

  constructor(private content: Content) { }

  // @TODO: add validation
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

      const meme: Meme = {
        author: req.user.id,
        authorDisplayName: req.user.displayName,
        id: memeId,
        publishedDate: new Date(),
        title: title,
        content: image.data,
      };

      await this.content.uploadMeme(meme);
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

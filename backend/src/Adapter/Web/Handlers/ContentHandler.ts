import type { Response, NextFunction } from 'express';
import { AuthorizedRequest, FileUploadRequest } from '../types';
import Content from '../../../Application/Content/Content';
import { v4 } from 'uuid';
// @TODO: Add module mapper
import { validatePagination } from '../../../Infrastructure/Validation/PaginationValidator';
import { extractPagination } from '../../../Util/pagination';
import { UploadedFile } from 'express-fileupload';
import { Meme } from '../../../Types/Content';
import { getConsoleLogger } from '../../../Util/logger';
import { Logger } from '../../../Util/types';


// @TODO: Add meme upload limit
class ContentHandler {

  private logger: Logger = getConsoleLogger('ContentHandler');

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
        authorId: req.user.id,
        author: req.user.displayName,
        id: memeId,
        publishedDate: new Date(),
        title: title,
        content: image.data,
        approved: false
      };

      await this.content.uploadMeme(meme);
      return res.sendStatus(200);
    } catch (err) {
      this.logger.error(err);
      return res.status(400).json({ error: err.message });
    }
  }

  async findMemes(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const pagination = extractPagination(req);
      const paginationValidatorError = validatePagination(pagination);
      if (paginationValidatorError) {
        return res.status(400).json({ error: paginationValidatorError });
      }

      const author = req.query.author ? Number(req.query.author) : undefined;
      const memes = await this.content.findMemes({
        contextUserId: req.user.id,
        pagination,
        authorId: author,
        role: req.user.role,
        approved: req.query.approved === undefined ? true : req.query.approved === 'true'
      });
      return res.json(memes).status(200);
    } catch (err) {
      this.logger.error(err);
      return res.sendStatus(400);
    }
  }

  // @TODO: figure out how to handle rollback
  // @TODO: Allow user to remove not their own memes
  async deleteMeme(req: AuthorizedRequest, res: Response, next: NextFunction) {
    const memeId = Number(req.params.id);
    try {
      const deleted = await this.content.deleteMeme(memeId, req.user.id);
      if (!deleted) {
        return res.status(400).json({ error: 'Failed to delete meme' });
      }
      return res.sendStatus(200);
    } catch (err) {
      this.logger.error(err);
      return res.status(400).json({ error: err.message });
    }
  }

  private async changeMemeApproval(req: AuthorizedRequest, res: Response, approved: boolean) {
    const memeId = Number(req.params.memeId);
    try {
      const result = await this.content.approveMeme(memeId, approved);
      if (result.status === 'error') {
        return res.status(400).json({ error: result.error });
      }
      return res.sendStatus(200);
    } catch (err) {
      this.logger.error(err);
      return res.status(400).json({ error: err.message });
    }
  }

  async approveMeme(req: AuthorizedRequest, res: Response, next: NextFunction) {
    return this.changeMemeApproval(req, res, true);
  }

  async disableMeme(req: AuthorizedRequest, res: Response, next: NextFunction) {
    return this.changeMemeApproval(req, res, false);
  }

  async upVote(req: AuthorizedRequest, res: Response, next: NextFunction) {
    return this.voteMeme(true, req, res, next);
  }

  async downVote(req: AuthorizedRequest, res: Response, next: NextFunction) {
    return this.voteMeme(false, req, res, next);
  }

  private async voteMeme(up: boolean, req: AuthorizedRequest, res: Response, next: NextFunction) {
    const memeId = Number(req.params.memeId);
    try {
      const memeResult = await this.content.memeExists(memeId);
      if (memeResult.status === 'error' && memeResult.data === undefined) {
        return res.status(400).json({ error: memeResult.error });
      }

      if (memeResult.data?.authorId === req.user.id) {
        return res.status(400).json({ error: 'You cannot vote on your own meme' });
      }

      const voteResult = await this.content.voteMeme(memeId, req.user.id, up);
      if (voteResult.status === 'error') {
        return res.status(400).json({ error: voteResult.error });
      }

      return res.sendStatus(200);
    } catch (err) {
      this.logger.error(err);
      return res.status(400).json({ error: err.message });
    }
  }

}

export default ContentHandler;

import Comment from "../../../Application/Comment/Comment";
import type { Response, NextFunction } from 'express';
import { AuthorizedRequest } from '../types';
import { getConsoleLogger } from '../../../Util/logger';


// @TODO: Add validation, limit comment length so that no one sends copy of Pan Tadeusz ifykyk
// @TODO: Add comment delete route
export class CommentHandler {

  private logger = getConsoleLogger('CommentHandler');

  constructor(private comment: Comment) { }

  async addComment(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const { meme, content } = req.body;
      this.logger.debug(`Adding comment on meme ${meme}`);
      const author = req.user.id;
      const result = await this.comment.addComment(meme, author, content);
      return res.status(200).json({ success: result });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getComments(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const meme = Number(req.params.memeId);
      this.logger.debug(`Getting comments on meme ${meme}`);
      const comments = await this.comment.getComments(meme);
      return res.status(200).json({ comments });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}
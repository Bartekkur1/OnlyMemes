import { getConsoleLogger } from "../../Util/logger";
import type { Logger } from "../../Util/types";
import { CommentRepository } from "./types";

class Comment {

  private logger: Logger = getConsoleLogger('Comment');

  constructor(private commentRepository: CommentRepository) {
    this.logger.info('Comment Service initialized');
  }

  async addComment(meme: number, author: number, content: string): Promise<boolean> {
    return this.commentRepository.addComment(meme, author, content);
  }

  async getComments(meme: number) {
    return this.commentRepository.getComments(meme);
  }

};

export default Comment;
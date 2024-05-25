import { getConsoleLogger } from "../../Util/logger";
import type { Logger } from "../../Util/types";
import { CommentRepository } from "./types";

class Comment {

  private logger: Logger = getConsoleLogger('Comment');

  constructor(private commentRepository: CommentRepository) { }

  async addComment(meme: number, author: number, content: string): Promise<boolean> {
    this.logger.debug(`User ${author} commenting on meme ${meme}...`);
    return this.commentRepository.addComment(meme, author, content);
  }

  async getComments(meme: number) {
    return this.commentRepository.getComments(meme);
  }

};

export default Comment;
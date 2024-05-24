import { Comment, CommentRepository } from "../../Application/Comment/types";
import { SQLRepositoryBase } from './SQLRepository';

export class SQLCommentRepository extends SQLRepositoryBase implements CommentRepository {

  async addComment(meme: number, author: number, content: string): Promise<boolean> {
    const publishedAt = new Date(Date.now());
    const result = await this.client.query('Comment').insert({
      meme,
      author,
      content,
      published_at: publishedAt
    });

    return result.length > 0 && result[0] > 0;
  }

  // @TODO: Implement pagination
  getComments(meme: number): Promise<Comment[]> {
    return this.client.query('Comment').select('*').where({ meme });
  }

}
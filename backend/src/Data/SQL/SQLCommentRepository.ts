import { Comment, CommentRepository } from "../../Application/Comment/types";
import { SQLRepositoryBase } from './SQLRepository';
import { QueryResult } from 'pg';

export default class SQLCommentRepository extends SQLRepositoryBase implements CommentRepository {

  async addComment(meme: number, author: number, content: string): Promise<boolean> {
    const publishedAt = new Date(Date.now());
    const result: QueryResult = await this.client.query('Comment').insert({
      meme,
      author,
      content,
      published_at: publishedAt
    });

    return (result.rowCount || 0) > 0;
  }

  // @TODO: Implement pagination
  getComments(meme: number): Promise<Comment[]> {
    return this.client.query('Comment as c')
      .join('User as u', 'c.author', 'u.id')
      .select(
        { id: 'c.id' },
        { display_name: 'u.display_name' },
        { author: 'c.author' },
        { content: 'c.content' },
        { published_at: 'c.published_at' }
      )
      .where('c.meme', meme);
  }

}
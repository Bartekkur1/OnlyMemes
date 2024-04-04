import { ContentRepository, ContentSearchQuery, Meme } from "../../Types/Content";
import { Pagination } from "../../Types/Shared";
import type SQLClient from "./SQLClient";


export default class SQLContentRepository implements ContentRepository {

  constructor(private client: SQLClient) { }

  async deleteMeme(id: string, userId: number): Promise<boolean> {
    const deletedRow = await this.client.query('Meme')
      .where('id', id)
      .andWhere('author', userId)
      .del();

    return deletedRow > 0;
  }

  async saveMeme({ title, author, url, publishedDate, externalId }: Meme): Promise<void> {
    return this.client.query('Meme')
      .insert({
        title: title,
        author: author,
        url: url,
        published_at: publishedDate,
        external_id: externalId
      });
  }

  async findMemes({ pagination, author }: ContentSearchQuery): Promise<Meme[]> {
    let query = this.client.query('Meme')
      .select('Meme.*', 'User.display_name')
      .from('Meme')
      .join('User', 'User.id', '=', 'Meme.author')
      .limit(pagination.size)
      .offset((pagination.page - 1) * pagination.size)
      .orderBy('published_at', 'desc');

    if (author && author !== undefined) {
      query = query.where('User.display_name', author);
    }

    return query.then(rows => {
      return rows.map(row => (<Meme>{
        id: row.id,
        url: row.url,
        author: row.display_name,
        authorDisplayName: '',
        publishedDate: row.published_at,
        title: row.title
      }))
    });
  }

  async findMeme(id: string): Promise<Meme | undefined> {
    return this.client.query('Meme')
      .select('Meme.*')
      .from('Meme')
      .where('Meme.id', id)
      .first()
      .then(row => {
        return row ? <Meme>{
          id: row.id,
          url: row.url,
          title: row.title,
          externalId: row.external_id,
          publishedDate: row.published_at
        } : undefined
      });
  }

}

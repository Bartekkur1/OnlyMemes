import type { ContentRepository, IdentityRepository, Meme } from "../../Application/Identity/types";
import type SQLClient from "./SQLClient";


export default class SQLContentRepository implements ContentRepository {

  constructor(private client: SQLClient) { }

  async deleteMeme(id: string): Promise<void> {
    // throw new Error("Method not implemented.");
  }

  async saveMeme({ title, author, url, publishedDate }: Meme): Promise<void> {
    return this.client.query('Meme')
      .insert({
        title: title,
        author: author,
        url: url,
        published_at: publishedDate
      });
  }

  async findMemes(): Promise<Meme[]> {
    return this.client.query('Meme')
      .select('Meme.*', 'User.display_name')
      .from('Meme')
      .join('User', 'User.id', '=', 'Meme.author')
      .limit(20)
      .orderBy('published_at', 'desc')
      .then(rows => {
        return rows.map(row => (<Meme>{
          id: row.id,
          url: row.url,
          author: row.display_name,
          publishedDate: new Date(),
          title: row.title
        }))
      });
  }

}

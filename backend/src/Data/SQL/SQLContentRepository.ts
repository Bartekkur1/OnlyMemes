import { ContentRepository, ContentSearch, Meme } from "../../Types/Content";
import { Role } from "../../Types/Identity";
import { AsyncResultObject } from "../../Util/types";
import { SQLRepositoryBase } from "./SQLRepository";


export default class SQLContentRepository extends SQLRepositoryBase implements ContentRepository {

  deleteVoteRecord(memeId: number, userId: number): Promise<void> {
    return this.client.query('Vote')
      .where('meme', memeId)
      .andWhere('user', userId)
      .del();
  }

  async createVoteRecord(memeId: number, userId: number, up: boolean) {
    await this.client.query('Vote')
      .insert({
        meme: memeId,
        user: userId,
        up
      });
  }

  async voteRecordExists(memeId: number, userId: number): Promise<boolean> {
    const record = await this.client.query('Vote')
      .where('meme', memeId)
      .andWhere('user', userId)
      .first();

    return record !== undefined;
  }

  async voteMeme(memeId: number, up: boolean): Promise<boolean> {
    const result = await this.client.query('Meme')
      .increment('votes', up ? 1 : -1)
      .where('id', memeId);

    return result === 1;
  }

  approveMeme(id: number, approve: boolean): Promise<boolean> {
    return this.client.query('Meme')
      .update({ approved: approve })
      .where('id', id)
      .then((count) => count >= 1);
  }

  async deleteMeme(id: number, userId: number): Promise<boolean> {
    const deletedRow = await this.client.query('Meme')
      .where('id', id)
      .andWhere('author', userId)
      .del();

    return deletedRow > 0;
  }

  async saveMeme({ title, authorId, url, publishedDate, externalId }: Meme): AsyncResultObject<boolean> {
    try {
      const queryResult = await this.client.query('Meme')
        .insert({
          title: title,
          author: authorId,
          url: url,
          published_at: publishedDate,
          external_id: externalId
        });
      if (queryResult['rowCount'] === 1) {
        return {
          status: 'success',
          data: true
        }
      } else {
        return {
          status: 'error',
          error: 'Failed to save meme'
        }
      }
    } catch (err) {
      return {
        status: 'error',
        error: err.message
      }
    }
  }

  async findMemes({ pagination, authorId, role, approved = true }: ContentSearch): Promise<Meme[]> {
    let query = this.client.query('Meme')
      .select('Meme.*', 'User.display_name', 'Vote.up as upVoted')
      .from('Meme')
      .join('User', 'User.id', '=', 'Meme.author')
      .leftJoin('Vote', 'Vote.meme', '=', 'Meme.id')
      .limit(pagination.size)
      .offset((pagination.page - 1) * pagination.size)
      .orderBy('published_at', 'desc');

    if (authorId && authorId !== undefined) {
      query = query.where('Meme.author', authorId);
    }

    if (role === Role.ADMIN) {
      query = query.where('Meme.approved', approved);
    }

    return query.then(rows => {
      return rows.map(row => (<Meme>{
        id: row.id,
        url: row.url,
        author: row.display_name,
        authorId: row.author,
        publishedDate: row.published_at,
        title: row.title,
        approved: row.approved,
        votes: row.votes,
        ...(row.upVoted ? { upVoted: row.upVoted !== null && row.upVoted } : {})
      }))
    });
  }

  async findMeme(id: number): Promise<Meme | undefined> {
    return this.client.query('Meme')
      .select('Meme.*')
      .from('Meme')
      .where('Meme.id', id)
      .first()
      .then(row => {
        return row ? <Meme>{
          id: row.id,
          authorId: row.author,
          url: row.url,
          title: row.title,
          externalId: row.external_id,
          publishedDate: row.published_at,
          approved: row.approved
        } : undefined
      });
  }

}

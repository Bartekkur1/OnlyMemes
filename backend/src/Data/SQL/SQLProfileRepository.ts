import { ProfileRepository, UserProfile } from "../../Types/Profile";
import SQLClient from "./SQLClient";

export default class SQLProfileRepository implements ProfileRepository {

  constructor(private client: SQLClient) { }

  isUserFollowing(userId: number, followedId: number): Promise<boolean> {
    return this.client.query('Follow')
      .select('id')
      .from('Follow')
      .where('Follow.follower', '=', userId)
      .where('Follow.followed', '=', followedId)
      .then(rows => {
        return rows.length > 0;
      });
  }

  async countUserFollows(userId: number): Promise<number> {
    const result = await this.client.query('Follow').count().where('Follow.followed', '=', userId);
    return Number(result[0].count);
  }

  countUserMemes(userId: number): Promise<number> {
    return this.client.query('Meme')
      .count()
      .from('Meme')
      .where('Meme.author', '=', userId)
      .then(rows => {
        return Number(rows[0].count);
      });
  }

  findUser(userId: number): Promise<UserProfile | null> {
    return this.client.query('User')
      .select('User.*')
      .from('User')
      .where('User.id', '=', userId)
      .then(rows => {
        if (rows.length === 0) {
          return null;
        }
        const row = rows[0];
        return <UserProfile>{
          id: row.id,
          displayName: row.display_name
        }
      });
  }

}
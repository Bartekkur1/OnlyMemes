import { FollowRepository } from "../../Types/Follow";
import { SQLRepositoryBase } from "./SQLRepository";

export default class SQLFollowRepository extends SQLRepositoryBase implements FollowRepository {

  async isUserFollowed(followerId: number, followingId: number): Promise<boolean> {
    const result = await this.client.query('Follow')
      .select('id')
      .where('follower', '=', followerId)
      .where('followed', '=', followingId)
      .first();

    return result !== undefined;
  }

  async unFollowUser(followerId: number, followingId: number): Promise<boolean> {
    const result = await this.client.query('Follow')
      .delete()
      .where('follower', '=', followerId)
      .where('followed', '=', followingId);

    return result ? true : false;
  }

  async followUser(followerId: number, followingId: number): Promise<boolean> {
    const result = await this.client.query('Follow').insert({
      follower: followerId,
      followed: followingId
    });

    return result ? true : false;
  }

}

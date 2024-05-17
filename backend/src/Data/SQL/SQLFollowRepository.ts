import { FollowRepository } from "../../Types/Follow";
import { SQLRepositoryBase } from "./SQLRepository";

export default class SQLFollowRepository extends SQLRepositoryBase implements FollowRepository {

  async followUser(followerId: number, followingId: number): Promise<boolean> {
    const result = await this.client.query('Follow').insert({
      follower: followerId,
      followed: followingId
    });

    return result ? true : false;
  }

}

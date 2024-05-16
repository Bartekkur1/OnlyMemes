import { FollowRepository } from "../../Types/Follow";
import { SQLRepositoryBase } from "./SQLRepository";

export default class SQLFollowRepository extends SQLRepositoryBase implements FollowRepository {

  followUser(followerId: number, followingId: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}

export interface FollowRepository {
  followUser(followerId: number, followingId: number): Promise<boolean>;
}
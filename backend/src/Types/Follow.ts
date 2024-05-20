export interface FollowRepository {
  isUserFollowed(followerId: number, followingId: number): Promise<boolean>;
  unFollowUser(followerId: number, followingId: number): Promise<boolean>;
  followUser(followerId: number, followingId: number): Promise<boolean>;
}
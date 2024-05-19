export interface UserProfile {
  id: number;
  displayName: string;
  memesCount?: number;
  followerCount?: number;
  following?: boolean;
}

export interface ProfileRepository {
  findUser(userId: number): Promise<UserProfile | null>;
  countUserMemes(userId: number): Promise<number>;
  countUserFollows(userId: number): Promise<number>;
  isUserFollowing(userId: number, followedId: number): Promise<boolean>;
}

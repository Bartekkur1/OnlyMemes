export interface UserProfile {
  id: number;
  displayName: string;
  memesCount?: number;
  followerCount?: number;
}

export interface ProfileRepository {
  findUser(userId: number): Promise<UserProfile | null>;
  countUserMemes(userId: number): Promise<number>;
  countUserFollows(userId: number): Promise<number>;
}

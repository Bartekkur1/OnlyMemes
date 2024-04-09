export interface UserProfile {
  id: number;
  displayName: string;
}

export interface ProfileRepository {
  findUser(userId: number): Promise<UserProfile | null>;
}

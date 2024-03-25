export interface UserProfile {
  id: number;
  displayName: string;
}

export interface ProfileRepository {
  findUser(id: string): Promise<UserProfile | null>;
}

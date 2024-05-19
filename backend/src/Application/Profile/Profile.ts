import { ProfileRepository, UserProfile } from "../../Types/Profile";
import { getConsoleLogger } from "../../Util/logger";
import { Logger } from "../../Util/types";

class Profile {

  constructor(
    private repository: ProfileRepository,
    private logger: Logger = getConsoleLogger('Profile')
  ) { }

  async findUser(userId: number, searchedUser: number): Promise<UserProfile | null> {
    this.logger.debug(`Finding user ${userId}`);
    const profile = await this.repository.findUser(searchedUser);
    if (!profile) {
      return null;
    }

    const memesCount = await this.repository.countUserMemes(searchedUser);
    profile.memesCount = memesCount;

    const followerCount = await this.repository.countUserFollows(searchedUser);
    profile.followerCount = followerCount;

    const following = await this.repository.isUserFollowing(userId, searchedUser);
    profile.following = following;

    return profile;
  }

}

export default Profile;

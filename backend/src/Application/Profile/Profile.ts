import { ProfileRepository, UserProfile } from "../../Types/Profile";
import { getConsoleLogger } from "../../Util/logger";
import { Logger } from "../../Util/types";

class Profile {

  constructor(
    private repository: ProfileRepository,
    private logger: Logger = getConsoleLogger('Profile')
  ) { }

  async findUser(userId: number): Promise<UserProfile | null> {
    this.logger.debug(`Finding user ${userId}`);
    const profile = await this.repository.findUser(userId);
    if (!profile) {
      return null;
    }

    const memesCount = await this.repository.countUserMemes(userId);
    profile.memesCount = memesCount;
    return profile;
  }

}

export default Profile;

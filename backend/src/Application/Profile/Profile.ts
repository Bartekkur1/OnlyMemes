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
    return this.repository.findUser(userId);
  }

}

export default Profile;

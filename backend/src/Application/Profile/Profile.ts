import { ProfileRepository, UserProfile } from "../../Types/Profile";
import { getConsoleLogger } from "../../Util/logger";
import { Logger } from "../../Util/types";

class Profile {

  constructor(
    private repository: ProfileRepository,
    private logger: Logger = getConsoleLogger('Profile')
  ) { }

  async findUser(displayName: string): Promise<UserProfile | null> {
    this.logger.debug(`Finding user ${displayName}`);
    return this.repository.findUser(displayName);
  }

}

export default Profile;

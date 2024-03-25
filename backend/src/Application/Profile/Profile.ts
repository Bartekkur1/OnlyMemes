import { ProfileRepository, UserProfile } from "../../Types/Profile";
import { getConsoleLogger } from "../../Util/logger";
import { Logger } from "../../Util/types";

class Profile {

  constructor(
    private repository: ProfileRepository,
    private logger: Logger = getConsoleLogger('Profile')
  ) { }

  async findUser(id: string): Promise<UserProfile | null> {
    this.logger.debug(`Finding user ${id}`);
    return this.repository.findUser(id);
  }

}

export default Profile;

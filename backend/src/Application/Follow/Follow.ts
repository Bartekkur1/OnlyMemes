import { getConsoleLogger } from '../../Util/logger';
import { Logger } from '../../Util/types';

class Follow {

  private logger: Logger = getConsoleLogger('Follow');

  constructor() { }

  followUser(followerId: number, followingId: number) {
    this.logger.info(`User ${followerId} following ${followingId}`);
  }

};

export default Follow;
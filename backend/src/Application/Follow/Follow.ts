import { FollowRepository } from '../../Types/Follow';
import { getConsoleLogger } from '../../Util/logger';
import { Logger } from '../../Util/types';

class Follow {

  private logger: Logger = getConsoleLogger('Follow');

  constructor(
    private followRepository: FollowRepository
  ) { }

  async followUser(followerId: number, followingId: number): Promise<boolean> {
    this.logger.debug(`User ${followerId} is trying to follow user ${followingId}`);
    if (followerId === followingId) {
      this.logger.error('User cannot follow themselves');
      return false;
    }
    try {
      const isUserFollowed = await this.followRepository.isUserFollowed(followerId, followingId);
      let success = false;
      if (isUserFollowed) {
        success = await this.followRepository.unFollowUser(followerId, followingId);
      } else {
        success = await this.followRepository.followUser(followerId, followingId);
      }
      if (!success) {
        this.logger.error('Failed to follow user');
        return false;
      }
    } catch (err) {
      this.logger.error(err);
      return false;
    }

    return true;
  }

};

export default Follow;
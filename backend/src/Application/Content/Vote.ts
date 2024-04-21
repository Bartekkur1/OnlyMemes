import { ContentRepository } from "../../Types/Content";
import { IdentityRepository } from "../../Types/Identity";
import { getConsoleLogger } from "../../Util/logger";

class Vote {
  private logger: Logger = getConsoleLogger('Content');

  constructor(
    private contentRepository: ContentRepository,
    private voteRepository: VoteRepository
  ) { }


}
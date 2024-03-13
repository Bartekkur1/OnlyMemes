import type { ContentStore } from "../../Infrastructure/ContentStore/types";
import { getConsoleLogger } from "../../Util/logger";
import type { Logger } from "../../Util/types";
import type { Meme } from "./types";

class Content {

  private logger: Logger = getConsoleLogger('Content')

  constructor(private contentStore: ContentStore) { }

  async uploadMeme(meme: Meme): Promise<void> {
    this.logger.debug('Uploading meme');
    await this.contentStore.uploadImage({
      id: meme.id,
      content: meme.content
    });
  }

}

export default Content;
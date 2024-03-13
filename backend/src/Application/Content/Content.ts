import type { ContentStore } from "../../Infrastructure/ContentStore/types";
import { getConsoleLogger } from "../../Util/logger";
import type { Logger } from "../../Util/types";
import type { ContentRepository, Meme } from "../Identity/types";
import { UploadMemeError } from "./error";

class Content {

  private logger: Logger = getConsoleLogger('Content')

  constructor(
    private contentStore: ContentStore,
    private contentRepository: ContentRepository
  ) { }

  async uploadMeme(meme: Meme): Promise<void> {
    this.logger.debug(`User ${meme.author} uploading meme...`);
    try {
      await this.contentRepository.saveMeme(meme);
      await this.contentStore.uploadImage({
        id: meme.id,
        content: meme.content
      });
    } catch (err) {
      await this.contentRepository.deleteMeme(meme.id);
      await this.contentStore.deleteMeme(meme.id);
      throw new UploadMemeError('');
    }
  }

}

export default Content;
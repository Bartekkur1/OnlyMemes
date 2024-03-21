import type { ContentStore } from "../../Infrastructure/ContentStore/types";
import { ContentRepository, Meme } from "../../Types/Content";
import { Pagination } from "../../Types/Shared";
import { getConsoleLogger } from "../../Util/logger";
import type { Logger } from "../../Util/types";
import { UploadMemeError } from "./error";

class Content {

  private logger: Logger = getConsoleLogger('Content');

  constructor(
    private contentStore: ContentStore,
    private contentRepository: ContentRepository
  ) { }

  async uploadMeme(meme: Meme): Promise<void> {
    this.logger.debug(`User ${meme.author} uploading meme...`);
    try {
      this.logger.debug('Uploading image...');
      meme.url = await this.contentStore.uploadImage({
        id: meme.id,
        content: meme.content
      });
      this.logger.debug('Saving meme database record...');
      await this.contentRepository.saveMeme(meme);
    } catch (err) {
      this.logger.error(err);
      this.logger.debug('Rolling back meme upload...');
      this.logger.debug('Removing back meme database record...');
      await this.contentRepository.deleteMeme(meme.id);
      this.logger.debug('Removing uploaded meme...');
      await this.contentStore.deleteMeme(meme.id);
      throw new UploadMemeError('Failed to upload image!');
    }
  }

  async findMemes({ page = 1, size = 10 }: Pagination): Promise<Meme[]> {
    this.logger.debug('Finding memes...');
    return this.contentRepository.findMemes({ page, size });
  }

}

export default Content;
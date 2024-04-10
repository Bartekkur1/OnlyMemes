import type { ContentStore } from "../../Infrastructure/ContentStore/types";
import { ContentRepository, Meme } from "../../Types/Content";
import { IdentityRepository } from "../../Types/Identity";
import { Pagination } from "../../Types/Shared";
import { getConsoleLogger } from "../../Util/logger";
import type { Logger } from "../../Util/types";
import { NotAuthorizedError, UploadMemeError } from "./error";

class Content {

  private logger: Logger = getConsoleLogger('Content');

  constructor(
    private contentStore: ContentStore,
    private contentRepository: ContentRepository,
    private identityRepository: IdentityRepository
  ) { }

  async uploadMeme(meme: Meme): Promise<void> {
    this.logger.debug(`User ${meme.author} uploading meme...`);
    try {
      this.logger.debug('Uploading image...');
      const uploadRes = await this.contentStore.uploadImage({
        file: meme.content!,
        id: meme.id
      });
      meme.externalId = uploadRes.externalId;
      meme.url = uploadRes.url;
      this.logger.debug('Saving meme database record...');
      await this.contentRepository.saveMeme(meme);
    } catch (err) {
      this.logger.error(err);
      this.logger.debug('Rolling back meme upload...');
      this.logger.debug('Removing back meme database record...');
      await this.contentRepository.deleteMeme(meme.id, meme.author!);
      this.logger.debug('Removing uploaded meme...');
      await this.contentStore.deleteMeme(meme.externalId!);
      throw new UploadMemeError('Failed to upload image!');
    }
  }

  async findMemes({ page = 1, size = 10 }: Pagination, authorId?: number): Promise<Meme[]> {
    this.logger.debug(`Searching for memes with filter: page ${page} size ${size} author ${authorId}...`);
    return this.contentRepository.findMemes({ pagination: { page, size }, authorId });
  }

  // @TODO: Check if user can remove meme
  async deleteMeme(id: string, userId: number): Promise<boolean> {
    try {
      const meme = await this.contentRepository.findMeme(id);
      const user = await this.identityRepository.findUserBydId(userId);

      if (meme?.authorId !== user?.id) {
        throw new NotAuthorizedError('User is not authorized to delete this meme!');
      }

      if (!meme) {
        return false;
      } else {
        const recordDelete = await this.contentRepository.deleteMeme(id, userId);
        const imageDelete = await this.contentStore.deleteMeme(meme.externalId!);
        return recordDelete && imageDelete;
      }
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

}

export default Content;
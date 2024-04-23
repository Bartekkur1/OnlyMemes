import type { ContentStore } from "../../Infrastructure/ContentStore/types";
import { ContentRepository, ContentSearch, Meme } from "../../Types/Content";
import { IdentityRepository } from "../../Types/Identity";
import { getConsoleLogger } from "../../Util/logger";
import type { AsyncResultObject, Logger } from "../../Util/types";
import { NotAuthorizedError, UploadMemeError } from "./error";

// @TODO: Migrate all functions to ResultObject
class Content {

  private logger: Logger = getConsoleLogger('Content');

  constructor(
    private contentStore: ContentStore,
    private contentRepository: ContentRepository,
    private identityRepository: IdentityRepository
  ) { }

  // @TODO: I need to fix this asap, its cringe
  async uploadMeme(meme: Meme): Promise<void> {
    this.logger.debug(`User ${meme.author} uploading meme...`);
    this.logger.debug('Uploading image...');
    const uploadResult = await this.contentStore.uploadImage({
      file: meme.content!,
      id: meme.id
    });

    if (uploadResult.error || !uploadResult.data) {
      throw new UploadMemeError('Failed to upload image!');
    }

    this.logger.debug('Image uploaded successfully!');
    meme.externalId = uploadResult.data.externalId;
    meme.url = uploadResult.data.url;


    this.logger.debug('Saving meme database record...');
    const saveResult = await this.contentRepository.saveMeme(meme);
    if (saveResult.status === 'error' && uploadResult.status === 'success') {
      this.logger.debug('Rolling back meme upload...');
      await this.contentStore.deleteMeme(meme.externalId!);
      throw new UploadMemeError('Failed to save meme!');
    }

    this.logger.debug('Meme saved successfully!');
  }

  async findMemes(query: ContentSearch): Promise<Meme[]> {
    const { pagination: { page = 1, size = 10 }, authorId } = query;
    this.logger.debug(`Searching for memes with filter: page ${page} size ${size} author ${authorId}...`);
    return this.contentRepository.findMemes(query);
  }

  // @TODO: Check if user can remove meme
  async deleteMeme(id: number, userId: number): Promise<boolean> {
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
        const imageDeleteResult = await this.contentStore.deleteMeme(meme.externalId!);
        return recordDelete && imageDeleteResult.status === 'success';
      }
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  async approveMeme(id: number, approve: boolean = true): AsyncResultObject {
    this.logger.debug(`Approving meme with id ${id}...`);
    const meme = await this.contentRepository.findMeme(id);
    if (!meme) {
      return {
        status: 'error',
        error: 'Meme not found!'
      };
    }

    if (meme.approved) {
      return {
        status: 'error',
        error: 'Meme already approved!'
      };
    }

    const approveResult = await this.contentRepository.approveMeme(id, approve);
    if (approveResult) {
      return {
        status: 'success',
        data: undefined
      };
    } else {
      return {
        status: 'error',
        error: 'Failed to approve meme!'
      };
    }
  }

  async voteMeme(memeId: number, userId: number, up: boolean): AsyncResultObject<boolean> {
    this.logger.debug(`Voting meme with id ${memeId}...`);

    const voteExists = await this.contentRepository.voteRecordExists(memeId, userId);
    if (up) {
      if (voteExists) {
        return {
          status: 'error',
          error: 'User already voted!'
        };
      }
      await this.contentRepository.createVoteRecord(memeId, userId, up);
    } else {
      if (!voteExists) {
        return {
          status: 'error',
          error: 'User has not voted yet!'
        };
      }
      await this.contentRepository.deleteVoteRecord(memeId, userId);
    }

    const voteCreated = await this.contentRepository.voteMeme(memeId, up);
    if (voteCreated) {
      return {
        status: 'success',
        data: true
      };
    } else {
      return {
        status: 'error',
        error: 'Failed to vote meme!'
      };
    }
  }

  async memeExists(memeId: number): AsyncResultObject<Meme> {
    const meme = await this.contentRepository.findMeme(memeId);

    if (meme === undefined) {
      return {
        status: 'error',
        error: 'Meme not found!'
      };
    }

    if (meme.approved === false) {
      return {
        status: 'error',
        error: 'Meme is not approved!'
      };
    }

    return {
      status: 'success',
      data: meme
    };
  }

}

export default Content;
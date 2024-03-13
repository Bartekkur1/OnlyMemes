import { getConsoleLogger } from "../../Util/logger";
import type { Logger } from "../../Util/types";
import { loadConfig } from "../config";
import { UploadError } from "./error";
import type { ContentStore, Image } from "./types";

const UPLOAD_URL = 'https://api.imgbb.com/1/upload';

interface ImgBBConfig {
  apiKey: string;
}

interface ImgBBResponse {
  data: {
    url: string;
  }
  success: boolean;
}


class ImgBB implements ContentStore {

  private config: ImgBBConfig;
  private logger: Logger = getConsoleLogger('ImgBB')

  constructor() {
    this.config = loadConfig<ImgBBConfig>({
      apiKey: 'IMGBB_API_KEY'
    });
  }

  async deleteMeme(id: string) {
    this.logger.debug(`Deleting meme with id ${id}`);
  }

  private getUploadUrl() {
    return `${UPLOAD_URL}?key=${this.config.apiKey}`;
  }

  private createMemeUploadForm({ id, content }: Image) {
    const payload = new FormData();
    payload.append('image', content);
    payload.append('name', id);
    return payload;
  }

  async uploadImage(image: Image): Promise<string> {
    const payload = this.createMemeUploadForm(image);
    const response = await fetch(this.getUploadUrl(), {
      method: 'POST',
      body: payload
    });
    const responseJson = await response.json() as ImgBBResponse;
    if (responseJson.success) {
      return responseJson.data.url;
    }

    throw new UploadError('Failed to upload meme');
  }
}

export default ImgBB;

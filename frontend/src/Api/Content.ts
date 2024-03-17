import { ImageUploadPayload } from "../Types/Content";
import getHttpClient from "./HttpClient";

export const ContentApi = {

  uploadMeme: async (payload: ImageUploadPayload) => {
    const response = await getHttpClient().post('/content', {
      ...payload
    });

    console.log(response);
  }

}
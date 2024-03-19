import { ImageUploadPayload, Meme } from "../Types/Content";
import getHttpClient from "./HttpClient";

export const ContentApi = {

  uploadMeme: async (payload: ImageUploadPayload) => {
    const response = await getHttpClient().post('/content', {
      ...payload
    });

    console.log(response);
  },

  fetchMemes: async (): Promise<Meme[]> => {
    const response = await getHttpClient().get('/content');
    return response.data as Meme[];
  }

}
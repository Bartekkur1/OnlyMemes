import { ImageUploadPayload, Meme } from "../Types/Content";
import getHttpClient from "./HttpClient";

export const ContentApi = {

  uploadMeme: async (payload: ImageUploadPayload) => {
    const response = await getHttpClient().post('/content', {
      ...payload
    });

    console.log(response);
  },


  // @TODO: Change page size lol
  fetchMemes: async (page: number): Promise<Meme[]> => {
    const response = await getHttpClient().get(`/content?page=${page}&size=2`);
    return response.data as Meme[];
  }

}
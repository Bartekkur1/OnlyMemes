import { FetchMemesQuery, ImageUploadPayload, Meme } from "../Types/Content";
import getHttpClient, { getAxiosErrorMessage } from "./HttpClient";

export const ContentApi = {

  uploadMeme: async (payload: ImageUploadPayload) => {
    try {
      const response = await getHttpClient().post('/content', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response);
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  },

  // @TODO: Change page size lol
  fetchMemes: async ({ page, size, author, approved, memeId }: FetchMemesQuery): Promise<Meme[]> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
    if (memeId) {
      params.append('memeId', memeId.toString());
    }
    if (author) {
      params.append('author', author.toString());
    }
    if (approved !== undefined) {
      params.append('approved', approved ? 'true' : 'false');
    }
    const response = await getHttpClient().get(`/content?${params.toString()}`);
    return response.data as Meme[];
  },

  deleteMeme: async (memeId: number) => {
    try {
      const response = await getHttpClient().delete(`/content/${memeId}`);
      return response.status === 200;
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  },

  approveMeme: async (memeId: number) => {
    try {
      const response = await getHttpClient().patch(`/content/${memeId}/approve`);
      return response.status === 200;
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  },

  disableMeme: async (memeId: number) => {
    try {
      const response = await getHttpClient().delete(`/content/${memeId}/approve`);
      return response.status === 200;
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  },

  voteMeme: async (memeId: number, vote: 'up' | 'down') => {
    try {
      const response = await getHttpClient().post(`/content/${memeId}/${vote === 'up' ? 'upvote' : 'downvote'}`);
      return response.status === 200;
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  }
}
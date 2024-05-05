import { FetchMemesQuery, ImageUploadPayload, Meme } from "../Types/Content";
import getHttpClient from "./HttpClient";

export const ContentApi = {

  uploadMeme: async (payload: ImageUploadPayload) => {
    const response = await getHttpClient().post('/content', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response);
  },

  // @TODO: Change page size lol
  fetchMemes: async ({ page, size, author, approved }: FetchMemesQuery): Promise<Meme[]> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
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
    const response = await getHttpClient().delete(`/content/${memeId}`);
    return response.status === 200;
  },

  approveMeme: async (memeId: number) => {
    const response = await getHttpClient().patch(`/content/${memeId}/approve`);
    return response.status === 200;
  },

  disableMeme: async (memeId: number) => {
    const response = await getHttpClient().delete(`/content/${memeId}/approve`);
    return response.status === 200;
  },

  voteMeme: async (memeId: number, vote: 'up' | 'down') => {
    const response = await getHttpClient().post(`/content/${memeId}/${vote === 'up' ? 'upvote' : 'downvote'}`);
    return response.status === 200;
  }
}
import getHttpClient, { getAxiosErrorMessage } from "./HttpClient";


export const CommentApi = {

  getComments: async (memeId: number) => {
    try {
      const result = await getHttpClient().get(`/comment/${memeId}`);
      return result.data.comments;
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  },

  addComment: async (memeId: number, content: string) => {
    try {
      await getHttpClient().post(`/comment`, { meme: memeId, content });
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  },

  removeComment: async (commentId: number) => {
    try {
      await getHttpClient().delete(`/comment/${commentId}`);
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  }

};
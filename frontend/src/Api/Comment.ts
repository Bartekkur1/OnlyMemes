import getHttpClient from "./HttpClient";


export const CommentApi = {

  getComments: async (memeId: number) => {
    const result = await getHttpClient().get(`/comment/${memeId}`);
    return result.data.comments;
  },

  addComment: async (memeId: number, content: string) => {
    await getHttpClient().post(`/comment`, { meme: memeId, content });
  }

};
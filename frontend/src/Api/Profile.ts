import { UserProfile } from "../Types/Profile";
import getHttpClient, { getAxiosErrorMessage } from "./HttpClient";

export const ProfileApi = {

  findProfile: async (id: number): Promise<UserProfile | undefined> => {
    try {
      const response = await getHttpClient().get(`/profile/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  },

  followUser: async (id: number) => {
    try {
      const response = await getHttpClient().post(`/follow/${id}`);
      return response.status === 200;
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  }

};

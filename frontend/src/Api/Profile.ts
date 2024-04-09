import { UserProfile } from "../Types/Profile";
import getHttpClient from "./HttpClient";

export const ProfileApi = {

  findProfile: async (id: number): Promise<UserProfile | undefined> => {
    try {
      const response = await getHttpClient().get(`/profile/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

};

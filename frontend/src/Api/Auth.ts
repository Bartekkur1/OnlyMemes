import { Credentials, InviteTokenDetails, Register } from "../Types/Auth";
import getHttpClient, { getAxiosErrorMessage } from "./HttpClient";

const AuthClient = {

  login: async (login: Credentials): Promise<string> => {
    try {
      const response = await getHttpClient().post('/identity/login', login);
      return response.data.token;
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  },

  register: async (register: Register): Promise<boolean> => {
    try {
      const response = await getHttpClient().post('/identity/register', register);
      return response.status === 201;
    } catch (err) {
      throw new Error(getAxiosErrorMessage(err));
    }
  },

  verifyToken: async (token: string): Promise<boolean> => {
    try {
      await getHttpClient().post('/identity/verify', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  },

  getInviteToken: async (): Promise<InviteTokenDetails> => {
    const response = await getHttpClient().get('/identity/getToken');
    return response.data;
  }

}

export default AuthClient;

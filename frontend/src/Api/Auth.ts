import { Credentials, InviteTokenDetails, Register } from "../Types/Auth";
import getHttpClient from "./HttpClient";

const AuthClient = {

  login: async (login: Credentials): Promise<string> => {
    const response = await getHttpClient().post('/identity/login', login);
    return response.data.token;
  },

  register: async (register: Register): Promise<boolean> => {
    const response = await getHttpClient().post('/identity/register', register);
    return response.status === 201;
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

import { Credentials, Register } from "../Types/Auth";
import getHttpClient from "./HttpClient";

const AuthClient = {

  login: async (login: Credentials): Promise<string> => {
    const response = await getHttpClient().post('/identity/login', login);
    return response.data.token;
  },

  register: async (register: Register) => {

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
  }

}

export default AuthClient;

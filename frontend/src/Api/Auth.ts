import { Credentials, Register } from "../Types/Auth";
import getHttpClient from "./HttpClient";

const AuthClient = {

  login: async (login: Credentials): Promise<string> => {
    const response = await getHttpClient().post('/identity/login', login);
    return response.data.token;
  },

  register: async (register: Register) => {

  }

}

export default AuthClient;

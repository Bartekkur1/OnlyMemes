import { Credentials, Register } from "../Types/Auth";
// import httpClient from "./HttpClient";

const AuthClient = {

  login: async (login: Credentials): Promise<string> => {
    // const response = await httpClient.post('/identity/login', login);
    return 'token 123';
  },

  register: async (register: Register) => {

  }

}

export default AuthClient;

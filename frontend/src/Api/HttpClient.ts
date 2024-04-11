import axios from 'axios';

const getHttpClient = () => {
  const headers: any = {};
  const token = localStorage.getItem('token');
  if (token !== null) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const httpClient = axios.create({
    // @TODO: Move this to environment variables
    baseURL: 'http://localhost:3001/api/',
    headers
  });

  return httpClient;
};

export default getHttpClient;

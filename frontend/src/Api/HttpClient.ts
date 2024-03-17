import axios from 'axios';

const getHttpClient = () => {
  const headers: any = {};
  const token = localStorage.getItem('token');
  if (token !== null) {
    headers['Authorization'] = token;
  }
  const httpClient = axios.create({
    baseURL: 'http://localhost:3001/api/',
    headers
  });

  return httpClient;
};

export default getHttpClient;

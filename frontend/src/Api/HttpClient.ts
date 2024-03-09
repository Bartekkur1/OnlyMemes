import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3001/api/'
});

export default httpClient;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.8:2408',
});

export default api;

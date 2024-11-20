import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

// You can add interceptors here if needed

export default instance;

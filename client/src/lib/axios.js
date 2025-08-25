import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://financial-ai-fkoq.onrender.com/api',
  withCredentials: true,
});

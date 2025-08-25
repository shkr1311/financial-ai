import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_API}/api`,
  withCredentials: true,
});

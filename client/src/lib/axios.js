import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_API}/api`,
  withCredentials: true,
});

export const stockApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_DJANGO_API || 'http://127.0.0.1:8000/stocks/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

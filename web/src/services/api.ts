import axios, { AxiosError } from 'axios';

const LOCAL_STORAGE_KEY = '@help-desk';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

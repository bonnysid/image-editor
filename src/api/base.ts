import axios from 'axios';

export const ipAPI = process.env.NODE_ENV === 'production' ? '45.9.43.5' : 'localhost'

export const instance = axios.create({
  baseURL: `http://${ipAPI}:5000`,
  withCredentials: true,
})

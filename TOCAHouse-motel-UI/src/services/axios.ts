import { caHouseBaseUrl } from '@/configs/APIconfig';
import axios from 'axios';
import { getToken } from './localStorageService';

export default axios.create({
  baseURL: caHouseBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  }
})

export const authAxios = axios.create({
  baseURL: caHouseBaseUrl,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}` ,
    "Cache-Control": "no-cache",
  }
})

export const formDataAxios = axios.create({
  baseURL: caHouseBaseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${getToken()}` ,
    "Cache-Control": "no-cache",
  }
})
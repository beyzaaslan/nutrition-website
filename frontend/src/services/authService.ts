import {apiRequest} from './apiHelper';
import { User } from '../types/User';
import Cookies from 'js-cookie';

export const login = async (credentials: { email: string; password: string }) => {
  const response = await apiRequest('POST', '/auth/login', credentials);
  
  // Login başarılıysa token'ı cookie'ye kaydet
  if (response.data.token) {
    Cookies.set('x-auth-token', response.data.token, { expires: 1 }); // 1 gün süreyle
  }
  
  return response;
};

// Diğer fonksiyonlar aynı kalabilir
export const register = async (userData: User) => {
  const response = await apiRequest('POST', '/auth/register', userData);
  return response;
};

export const verifyEmail = async (token: string) => {
  return await apiRequest('POST', '/auth/verifyEmail', { token });
};
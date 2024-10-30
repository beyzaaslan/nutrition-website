import {apiRequest} from './apiHelper';
import { User } from '../types/User';

// Kullanıcı giriş fonksiyonu
export const login = async (credentials: { email: string; password: string }) => {
    return await apiRequest('POST', '/auth/login', credentials);
};
// Kullanıcı kayıt fonksiyonu
export const register = async (userData: User) => {
    return await apiRequest('POST', '/auth/register', userData);
};
// Geçerli kullanıcıyı alma fonksiyonu
export const getCurrentUser = async () => {
    return await apiRequest('GET', '/auth/me');
};
// E-posta doğrulama fonksiyonu
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyEmail = async (data: any) => {
    return await apiRequest('POST', '/auth/verifyemail' , data );
};

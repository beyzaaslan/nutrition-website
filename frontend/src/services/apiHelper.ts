/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from './api';

// Generic tür kullanarak veri tipini tanımlayın
export const apiRequest = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: T
 // data parametresi generic tip alacak
): Promise<any> => {
    const url = `${BASE_URL}${endpoint}`;

    const config: AxiosRequestConfig = {
        method,
        url,
        data,
    };
    try {
        const response = await axios(config);
        console.log(response.data,"responseApiHelper");
        return response; // Yanıtın içeriğini döndür
    } catch (error) {
        // Hata yönetimi
        console.error(`Error with ${method} request to ${url}:`, error);
        throw error; // Hatanın üst katmana iletilmesini sağlar
    }
};

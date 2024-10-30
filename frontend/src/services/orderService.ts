import { apiRequest } from './apiHelper';
import { Order } from '../types/Order';

// Tüm siparişleri almak için
export const getOrders = async () => {
    return await apiRequest('GET', '/order');
};

// Belirli bir siparişi almak için
export const getOrderById = async (orderId: number) => {
    return await apiRequest('GET', `/order/${orderId}`);
};

// Yeni bir sipariş oluşturmak için
export const createOrder = async (orderData: Order) => {
    return await apiRequest('POST', '/order', orderData);
};

import { apiRequest } from './apiHelper';
import { Product } from '../types/Product';

// Tüm ürünleri almak için
export const getProducts = async (page: number = 1, limit: number = 12) => {
    try {
        const offset = (page - 1) * limit;
        return await apiRequest('GET', `/product?limit=${limit}&offset=${offset}`);
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
// Arama terimine göre ürünleri almak için
export const searchProducts = async (searchTerm: string) => {
    return await apiRequest('GET', `/product?searchTerm=${searchTerm}`);
};

// Belirli bir ürünü almak için
export const getProductById = async (productId: number) => {
    return await apiRequest('GET', `/product/${productId}`);
};

// Yeni bir ürün oluşturmak için
export const createProduct = async (productData: Product) => {
    console.log('Product olusturuldu:', Response);
    return await apiRequest('POST', '/product', productData);
};

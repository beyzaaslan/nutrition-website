import { apiRequest } from './apiHelper';
import { Product } from '../types/Product';

// Tüm ürünleri almak için
export const getProducts = async (page: number = 1, limit: number = 12) => {
    try {
        const offset = (page - 1) * limit;
        return await apiRequest<Product[]>('GET', `/product?limit=${limit}&offset=${offset}`);
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Arama terimine göre ürünleri almak için
export const searchProducts = async (searchTerm: string) => {
    try {
        return await apiRequest<Product[]>('GET', `/product?searchTerm=${searchTerm}`);
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};

// Belirli bir ürünü almak için
export const getProductById = async (productId: number) => {
    try {
        const response = await apiRequest<Product>('GET', `/product/${productId}`);
        console.log("response",response);
        return response;
    } catch (error) {
        console.error(`Error fetching product with id ${productId}:`, error);
        throw error;
    }
};


// Yeni bir ürün oluşturmak için
export const createProduct = async (productData: Product) => {
    try {
        const response = await apiRequest<Product>('POST', '/product', productData);
        console.log('Product created:', response);
        return response;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

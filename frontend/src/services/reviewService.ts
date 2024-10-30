import { apiRequest } from './apiHelper';
import { Review } from '../types/Review';

// Tüm incelemeleri almak için
export const getReviews = async () => {
    return await apiRequest('GET', '/review');
};

// Belirli bir ürünün incelemelerini almak için
export const getReviewsForProduct = async (productId: number) => {
    return await apiRequest('GET', `/product/${productId}?include=review`);
};

// Yeni bir inceleme oluşturmak için
export const createReview = async (reviewData: Review) => {
    return await apiRequest('POST', '/review', reviewData);
};

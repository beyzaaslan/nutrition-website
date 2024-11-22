export const BASE_URL = 'http://localhost:3000/api';

export const endpoints = {
    address: `${BASE_URL}/address`,
    auth: {
        register: `${BASE_URL}/auth/register`,
        login: `${BASE_URL}/auth/login`,
        me: `${BASE_URL}/auth/me`,
    },
    category: `${BASE_URL}/category`,
    user: `${BASE_URL}/user`,
    product: `${BASE_URL}/product`,
    review: `${BASE_URL}/review`,
    order: `${BASE_URL}/order`,
    orderItem: `${BASE_URL}/orderItem`,
    payment: `${BASE_URL}/payment`,
    priceInfo: `${BASE_URL}/priceInfo`,
};

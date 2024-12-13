import axios from 'axios';

export const createStripePayment = async (orderId: number, amount: number) => {
    try {
        // Backend'e ödeme bilgisi gönder
        const response = await axios.post('http://localhost:3000/payment/stripe', {
            orderId,
            amount
        });
          
        // Backend'den gelen clientSecret'ı döndürüyoruz
        return response.data.clientSecret;
    } catch (error) {
        throw new Error('Stripe ödeme isteği oluşturulamadı.');
    }
};

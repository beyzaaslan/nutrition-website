import axios from 'axios';

export const createStripePayment = async (orderId: number, amount: number) => {
    try {
        // Backend'e ödeme bilgisi gönder
        console.log("orderid-amount",orderId,amount);
        const response = await axios.post('http://localhost:3000/payment/stripe', {
            orderId,
            amount
        });
          
        // Backend'den gelen clientSecret'ı döndürüyoruz
        return response.data.clientSecret;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error('Stripe ödeme isteği oluşturulamadı.');
    }
};

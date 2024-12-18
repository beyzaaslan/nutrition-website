import axios from 'axios';

export const createStripePayment = async (OrderId: number, amount: number) => {
    try {
        // Backend'e ödeme bilgisi gönder
        console.log("orderid,amount",OrderId,amount);
        const response = await axios.post('http://localhost:3000/payment/create-intent', {
            OrderId,
            amount
        });
        // Backend'den gelen clientSecret'ı döndürüyoruz
        return response.data.clientSecret;
    } catch (error) {
        console.error("Error creating Stripe payment:", error); // Log the actual error
        throw new Error('Stripe ödeme isteği oluşturulamadı.');
    }
};

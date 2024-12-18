import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { OrderItem } from '../../types/OrderItem';
import { createStripePayment } from '../../services/stripe';

interface CreditCardFormProps {
    OrderId: number;
    amount: number;
    orderResponse: OrderItem; 
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ OrderId, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setError(null);

        if (!stripe || !elements) {
            setError('Stripe yüklenemedi. Lütfen sayfayı yenileyin.');
            setProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError('Kart bilgileri bulunamadı.');
            setProcessing(false);
            return;
        }

        try {
            // Stripe ödeme için clientSecret'ı almak
            console.log("beyza");  
            const response = await createStripePayment(OrderId, amount);
            console.log("beyza",response,OrderId,amount);  
            const clientSecret = response.data.clientSecret;  // 'clientSecret' response'dan alınır

            // Stripe ile ödeme intentini tamamla
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });

            if (stripeError) {
                setError(stripeError.message || 'Ödeme işlemi başarısız oldu.');
            } else if (paymentIntent?.status === 'succeeded') {
                setSuccess(true);
                navigate('/success'); // Başarı sayfasına yönlendirin
            } else {
                setError('Ödeme tamamlanamadı.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success ? (
                <p style={{ color: 'green' }}>Ödeme başarıyla tamamlandı!</p>
            ) : (
                <form onSubmit={handlePaymentSubmit}>
                    <div style={{ margin: '20px 0' }}>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                    <button type="submit" disabled={!stripe || processing} style={{ padding: '10px 20px' }}>
                        {processing ? 'İşlem yapılıyor...' : 'Öde'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default CreditCardForm;
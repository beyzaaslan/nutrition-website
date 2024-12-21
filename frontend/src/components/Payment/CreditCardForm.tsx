import React from "react";
import { createStripePayment } from "../../services/stripe";

interface CreditCardFormProps {
  OrderId: number;
  amount: number;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ OrderId, amount }) => {
  const handleCheckout = async () => {
    try {
      const stripeUrl = await createStripePayment(OrderId, amount);

      // Kullanıcıyı Stripe ödeme sayfasına yönlendir
      window.location.href = stripeUrl;
    } catch (error) {
      console.error("Checkout başlatılamadı:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} style={{ padding: "10px 20px" }}>
        Ödemeye Git
      </button>
    </div>
  );
};

export default CreditCardForm;
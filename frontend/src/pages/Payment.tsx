import { Box, Typography } from '@mui/material';
import { useShoppingCart } from '../context/ShoppingCartContext';
import VerticalLinearStepper from '../components/Payment/Step';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QTrHhDmeOtxZbxLePXbArIebDdEzT73dIYapUKq3c8mC7arpsczwVcnTFwrdCv6DdQawCSj4ZHx6jj955e4vkXy00vBtnzPYl');

const Payment = () => {
  const { cartItems, getTotalPrice } = useShoppingCart();
  const totalPrice = getTotalPrice();

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      gap: 2,
      p: 2
    }}>
      {/* Sol Panel - Stepper */}
      <Box sx={{
        flex: '0 0 60%',
        backgroundColor: 'white',
        borderRadius: 2,
        p: 3,
        height: 'fit-content',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4,
          pb: 2,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Beyza Aslan
          </Typography>
        </Box>
        <Elements 
          stripe={stripePromise} 
          options={{
            mode: 'payment',
            amount: totalPrice * 100,
            currency: 'try',
          }}
        >
          <VerticalLinearStepper />
        </Elements>
      </Box>

      {/* Sağ Panel - Sipariş Özeti */}
      <Box sx={{
        flex: '0 0 38%',
        backgroundColor: '#fff',
        p: 3,
        borderRadius: 2,
        height: 'fit-content',
        position: 'sticky',
        top: 16,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h6" sx={{ 
          mb: 3,
          pb: 2,
          borderBottom: '1px solid #e0e0e0'
        }}>
          Sipariş Özeti
        </Typography>
        
        {/* Ürün listesi */}
        <Box sx={{ mb: 4 }}>
          {cartItems.map((item) => (
            <Box 
              key={item.variantId} 
              sx={{ 
                mb: 2,
                p: 2,
                borderRadius: 1,
                backgroundColor: '#f8f8f8'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={item.photo_src} 
                    alt={item.name} 
                    style={{ 
                      width: 50, 
                      height: 50, 
                      marginRight: 10,
                      borderRadius: '4px',
                      objectFit: 'cover'
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.quantity} adet
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 500 }}>
                  {(item.price * item.quantity).toFixed(2)} TL
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Fiyat detayları */}
        <Box sx={{ 
          pt: 2,
          mt: 2,
          borderTop: '1px solid #e0e0e0'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary">Ara Toplam</Typography>
            <Typography>{totalPrice.toFixed(2)} TL</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography color="text.secondary">Kargo</Typography>
            <Typography color="success.main">Ücretsiz</Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 2,
            pt: 2,
            borderTop: '1px dashed #e0e0e0'
          }}>
            <Typography variant="h6">Toplam</Typography>
            <Typography variant="h6" color="primary">
              {totalPrice.toFixed(2)} TL
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;

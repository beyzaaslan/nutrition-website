import VerticalLinearStepper from '../components/Payment/Step';
import { Box, Typography } from '@mui/material';

const Payment = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        overflow: 'hidden', // Sayfa genelinde kaydırmayı engelle
      }}
    >
      {/* Sol Panel (Beyaz) */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          overflowY: 'auto', 
          height: '100%',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
        }}
      >
        <Box>
          <VerticalLinearStepper />
        </Box>
      </Box>

      {/* Sağ Panel (Mavi) */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#e3f2fd', // Mavi renk
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', 
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Sağ Panel
        </Typography>
        <Typography variant="body1">Burada başka bir içerik olacak.</Typography>
      </Box>
    </Box>
  );
};
export default Payment;

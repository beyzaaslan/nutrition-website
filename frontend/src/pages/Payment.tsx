import VerticalLinearStepper from '../components/Payment/Step';
import { Box, Grid, Container, Typography, Button } from '@mui/material';

const Payment = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        {/* Sol Panel (Beyaz) */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: '#ffffff', // Beyaz renk
            height: '100%',
            padding: 2,
          }}
        >
          <Box>
            <VerticalLinearStepper />
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                backgroundColor: '#1130b9',
                '&:hover': {
                  backgroundColor: '#1130b9',
                },
              }}
            >
              Siparişi Tamamla
            </Button>
          </Box>
        </Grid>

        {/* Sağ Panel (Mavi) */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: '#e3f2fd', // Mavi renk
            height: '100vh',
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Sağ Panel
            </Typography>
            <Typography variant="body1">
              Burada başka bir içerik olacak.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 2,
                backgroundColor: '#f44336',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}
            >
              Ödemeyi Tamamla
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payment;

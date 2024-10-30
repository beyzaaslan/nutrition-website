import { Container, Box, Typography, Grid, Button } from '@mui/material';

const orders = [
  {
    id: 1,
    title: 'DEEP SLEEP',
    date: '31 Mart 2023',
    orderNumber: '427795',
    status: 'Teslim Edildi',
    imageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    title: 'MELATONIN - GÜNLÜK VİTAMİN PAKETİ - BROMELAIN',
    date: '14 Aralık 2022',
    orderNumber: '290405',
    status: 'Teslim Edildi',
    imageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: 3,
    title: 'GAMER HACK - DETOX PAKETİ',
    date: '19 Kasım 2022',
    orderNumber: '255564',
    status: 'Teslim Edildi',
    imageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: 4,
    title: 'CREAM OF RICE',
    date: '1 Ekim 2022',
    orderNumber: '190462',
    status: 'Teslim Edildi',
    imageUrl: 'https://via.placeholder.com/50',
  },
];

const Orders = () => (
  <Container>
    {/* Sağ Panel */}
    <Box sx={{ flex: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Siparişlerim ({orders.length})
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #E5E5E5', paddingBottom: 2, marginBottom: 2 }}>
              <Box component="img" src={order.imageUrl} alt={order.title} sx={{ width: 50, height: 50, marginRight: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {order.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {order.date} Tarihinde Sipariş Verildi
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {order.orderNumber} numaralı sipariş
                </Typography>
                <Typography variant="body2" color="green">
                  {order.status}
                </Typography>
              </Box>
              <Button variant="outlined">Detay Görüntüle</Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Container>
);

export default Orders;
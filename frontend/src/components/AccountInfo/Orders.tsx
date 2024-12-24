import { Container, Box, Typography, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";

type Orders = {
  id: number;
  total: number;
  status: "pending" | "completed" | "cancelled"; // Status için olası değerler
  createdAt: string; 
  updatedAt: string; 
  UserId: number | null; 
  title: string; 
  imageUrl: string; 
  orderNumber: string; 
  date: string; 
};

const Orders = () => {
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders(); // API çağrısı
      setOrders(response);
      console.log("first order", response);
    };
    fetchOrders();
  }, []);
  

  return (
    <Container>
      {/* Sağ Panel */}
      <Box sx={{ flex: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Siparişlerim ({orders.length})
        </Typography>
        <Grid container spacing={2}>
          {orders?.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #E5E5E5",
                  paddingBottom: 2,
                  marginBottom: 2,
                }}
              >
                <Box
                  component="img"
                  src={order.imageUrl}
                  alt={order.title}
                  sx={{ width: 50, height: 50, marginRight: 2 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
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
};

export default Orders;
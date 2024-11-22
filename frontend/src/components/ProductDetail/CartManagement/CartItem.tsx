// components/CartItem.tsx
import React from 'react';
import { Box} from '@mui/material';


interface CartItemProps {
  id: number;
  quantity: number;
  name: string;
  photo_src: string;
  price: number;
  flavor: string;
  size: string;
}

export const CartItem: React.FC<CartItemProps> = () => {
    
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2, 
      mb: 2,
      p: 2,
      border: '1px solid #eee',
      borderRadius: 2
    }}>
    ssepette ürünler  yuppp 
    </Box>
  );
};
import React from 'react';
import { Drawer, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CartItem } from './CartItem';
import { useShoppingCart } from '../../../context/ShoppingCartContext';

export const ShoppingCart: React.FC = () => {
  const { isOpen, setIsOpen, cartItems } = useShoppingCart();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Box sx={{ width: 450, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Sepetim</Typography>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {cartItems.map(item => (
          <CartItem 
          key={`${item.flavor}`} 
          item={{
            id: item.id,
            variantId: item.variantId,
            quantity: item.quantity,
            name: item.name,
            photo_src: item.photo_src,
            price: item.price,
            flavor: item.flavor,
            size: item.size
          }} 
        />
        ))}
      </Box>
    </Drawer>
  );
};
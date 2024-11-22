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
      <Box sx={{ width: 400, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Sepetim</Typography>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {cartItems.map(item => (
          <CartItem key={item.id} {...item} />
        ))}
      </Box>
    </Drawer>
  );
};
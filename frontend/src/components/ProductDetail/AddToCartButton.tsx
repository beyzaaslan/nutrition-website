import React from 'react';
import { Button } from '@mui/material';
import { Variant } from '../../types/Product';

interface AddToCartButtonProps {
  variant: Variant | null;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ variant }) => {
  const handleAddToCart = () => {
    if (variant) {
      // Sepete ekleme işlemi yapılabilir
      console.log(`Added ${variant.name} to cart`);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const QuantitySelector: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div>
      <Button onClick={handleDecrement}>-</Button>
      <TextField value={quantity} readOnly />
      <Button onClick={handleIncrement}>+</Button>
    </div>
  );
};

export default QuantitySelector;

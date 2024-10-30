import React from 'react';
import {  Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface QuantitySelectorProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ count, onIncrease, onDecrease }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center',marginTop:'.5rem' }}>
      <Button
        variant="contained"
        onClick={onDecrease}
        sx={{ minWidth: '30px', minHeight: '30px', }}
      >
        <RemoveIcon />
      </Button>
      <Typography variant="h4" mx={2}>
        {count}
      </Typography>
      <Button
        variant="contained"
        onClick={onIncrease}
        sx={{ minWidth: '30px', minHeight: '30px',}}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};

export default QuantitySelector;
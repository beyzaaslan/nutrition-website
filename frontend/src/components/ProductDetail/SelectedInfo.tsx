import React from 'react';
import { Box, Typography } from '@mui/material';
import { Size } from '../../types/Size';

interface SelectedInfoProps {
  selectedFlavor: string;
  selectedSize: Size;
}

export const SelectedInfo: React.FC<SelectedInfoProps> = ({
  selectedFlavor,
  selectedSize,
}) => (
  <Box sx={{ marginTop: "16px" }}>
    <Typography>
      Seçili Aroma: <strong>{selectedFlavor}</strong>
    </Typography>
    <Typography>
      Seçili Gramaj: <strong>{selectedSize.gram}g</strong>
    </Typography>
    <Typography>
      Adet: <strong>{selectedSize.pieces}</strong>
    </Typography>
  </Box>
);

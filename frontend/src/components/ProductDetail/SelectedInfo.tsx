import React from "react";
import { Box, Typography } from "@mui/material";
import { Size } from '../../types/Size';
import { PriceInfo } from '../../types/PriceInfo';


interface SelectedInfoProps {
  selectedFlavor: string;
  selectedSize: Size;
  priceInfo?: PriceInfo;
}

export const SelectedInfo: React.FC<SelectedInfoProps> = ({
  selectedFlavor,
  selectedSize,
  priceInfo
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
    {priceInfo && (
      <Box sx={{ mt: 1 }}>
        <Typography
          component="span"
          sx={{
            textDecoration: priceInfo.discount_percentage ? "line-through" : "none",
            color: priceInfo.discount_percentage ? "text.secondary" : "text.primary",
            mr: 1,
          }}
        >
          {priceInfo.total_price.toFixed(2)} TL
        </Typography>
        {priceInfo.discount_percentage && priceInfo.discounted_price && (
          <>
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
                mr: 1,
              }}
            >
              {priceInfo.discounted_price.toFixed(2)} TL
            </Typography>
            <Typography
              component="span"
              sx={{
                color: "success.main",
                fontSize: "0.875rem",
              }}
            >
              ({priceInfo.discount_percentage}% İndirim)
            </Typography>
          </>
        )}
      </Box>
    )}
  </Box>
);
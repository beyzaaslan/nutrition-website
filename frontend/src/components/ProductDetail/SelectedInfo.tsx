import React from "react";
import { Box, Typography } from "@mui/material";
import { Size } from "../../types/Size";
import { PriceInfo } from "../../types/PriceInfo";

interface SelectedInfoProps {
  selectedFlavor: string;
  selectedSize: Size;
  priceInfo?: PriceInfo;
}

export const SelectedInfo: React.FC<SelectedInfoProps> = ({
  /*   selectedFlavor,
  selectedSize, */
  priceInfo,
}) => (
  <Box sx={{ marginTop: "16px" }}>
    {/*     <Typography>
      Seçili Aroma: <strong>{selectedFlavor}</strong>
    </Typography>
    <Typography>
      Seçili Gramaj: <strong>{selectedSize.gram}g</strong>
    </Typography>
    <Typography>
      Adet: <strong>{selectedSize.pieces}</strong>
    </Typography>
 */}
    {priceInfo && (
      <Box sx={{ mt: 2 }}>
        {/* Fiyat kısmı */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          {/* İndirimli fiyat */}
          {priceInfo.discount_percentage && priceInfo.discounted_price && (
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              {priceInfo.discounted_price.toFixed(2)} TL
            </Typography>
          )}
          {/* İndirimli fiyat çizgisi */}
          <Typography
            component="span"
            sx={{
              textDecoration: priceInfo.discount_percentage
                ? "line-through"
                : "none",
              color: priceInfo.discount_percentage ? "red" : "black",
              fontWeight: priceInfo.discount_percentage ? "900" : "600",
              fontSize: "1.25rem",
            }}
          >
            {priceInfo.total_price.toFixed(2)} TL
          </Typography>
        </Box>

        {/* Kazanç kısmı */}
        {priceInfo.discount_percentage && (
          <Box
            sx={{
              backgroundColor: "#d8f5d8",
              color: "#1a8e1a",
              padding: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              marginTop: "8px",
              display: "inline-block",
            }}
          >
            Kazancınız:{" "}
            {(priceInfo.total_price - priceInfo.discounted_price!).toFixed(2)}{" "}
            TL
          </Box>
        )}
      </Box>
    )}



  </Box>
);

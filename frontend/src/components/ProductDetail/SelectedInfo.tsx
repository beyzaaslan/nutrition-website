import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Size } from "../../types/Size";
import { PriceInfo } from "../../types/PriceInfo";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Variant } from "../../types/Variant";
import { CartItem } from "../../types/CartItem";

export interface SelectedInfoProps {
  selectedFlavor: string;
  selectedSize: Size;
  priceInfo?: PriceInfo;
  id: number;
  selectedVariant: Variant;
  productName: string; // Product adını da props olarak alalım
}

export const SelectedInfo: React.FC<SelectedInfoProps> = ({
  priceInfo,
  id,
  selectedVariant,
  selectedFlavor,
  selectedSize,
  productName,
}) => {
  const { getItemAmount, increaseCartAmount, decreaseCartAmount } =
    useShoppingCart();
  const quantity = getItemAmount(id,);

  const handleAddToCart = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cartItemData: CartItem = {
      id,
      variantId: selectedVariant.id,
      quantity: 1,
      name: productName,
      photo_src: selectedVariant.photo_src || "",
      price: priceInfo?.discounted_price || priceInfo?.total_price || 0,
      flavor: selectedFlavor,
      size: `${selectedSize.gram}G`,
    };
    increaseCartAmount(id, cartItemData);
  };

  return (
    <Box sx={{ marginTop: "16px" }}>
      {priceInfo && (
        <Box sx={{ mt: 2 }}>
          {/* Fiyat kısmı */}
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
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
              {(
                priceInfo.total_price - (priceInfo.discounted_price || 0)
              ).toFixed(2)}{" "}
              TL
            </Box>
          )}
        </Box>
      )}

      {/* Sepete ekle ve adet seçici */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: 2,
        }}
      >
        {/* Adet seçici */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            height: "50px",
          }}
        >
          <IconButton
            onClick={() => decreaseCartAmount(id)}
            sx={{
              borderRight: "1px solid #ccc",
              backgroundColor: "#f7f7f7",
              borderRadius: 0,
              height: "100%",
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            {quantity}
          </Typography>
          <IconButton
            onClick={() => {
              const cartItemData: CartItem = {
                id,
                variantId: selectedVariant.id,
                quantity: 1,
                name: productName,
                photo_src: selectedVariant.photo_src || "",
                price:
                  priceInfo?.discounted_price || priceInfo?.total_price || 0,
                flavor: selectedFlavor,
                size: `${selectedSize.gram}G`,
              };
              increaseCartAmount(id, cartItemData);
            }}
            sx={{
              borderRight: "1px solid #ccc",
              backgroundColor: "#f7f7f7",
              borderRadius: 0,
              height: "100%",
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* Sepete ekle butonu */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            width: "300px",
            height: "50px",
            backgroundColor: "black",
          }}
          onClick={handleAddToCart}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShoppingCartIcon />
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              SEPETE EKLE
            </Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

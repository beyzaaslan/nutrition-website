import React from "react";

interface ProductImageProps {
  product: { name: string | null };
  selectedPhoto: string; // Seçili varyant veya ürün ana fotoğrafı
}

export const ProductImage: React.FC<ProductImageProps> = ({
  product,
  selectedPhoto,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <img
        src={selectedPhoto}
        alt={product.name || "Product"}
        style={{
          width: "100%",
          maxWidth: "400px",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

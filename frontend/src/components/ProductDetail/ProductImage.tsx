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
        borderRadius: "20px",
        width: "400px",
        height: "500px",
        overflow: "hidden", // Taşan resimleri gizle
        padding:'20px',
        margin:'10px'
      }}
    >
      <img
        src={selectedPhoto}
        alt={product.name || "Product"}
        style={{
          width: "160%",
          height: "100%", // Kapsayıcıyı tamamen doldur
          objectFit: "fill", // Resmi orantılı bir şekilde doldur
          borderRadius: "10px",
          background: "yellow", // Resmin sarı arka planı
        }}
      />
    </div>
  );
};

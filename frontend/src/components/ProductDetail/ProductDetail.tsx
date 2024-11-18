import React, { useState, useMemo, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { Product } from "../../types/Product";
import { Variant } from "../../types/Variant";
import { Size } from "../../types/Size";
import { ProductRating } from "./ProductRating";
import { ProductHeader } from "./ProductHeader";
import { FlavorSelector } from "./FlavorSelector";
import { SizeSelector } from "./SizeSelector";
import { SelectedInfo } from "./SelectedInfo";
import { ProductImage } from "./ProductImage";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    product.Variants?.[0]?.flavor ?? ""
  );

  const [selectedSize, setSelectedSize] = useState<Size | null>(
    product.Variants?.[0]?.Sizes[0] ?? null
  );

  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    product.Variants?.[0]?.photo_src || ""
  );

  const tags: string[] = product.tags ? JSON.parse(product.tags) : [];

  const groupedVariants = useMemo(() => {
    return product.Variants?.reduce<Record<string, Variant[]>>((acc, variant) => {
      const flavor = variant.flavor;
      if (!acc[flavor]) {
        acc[flavor] = [];
      }
      acc[flavor].push(variant);
      return acc;
    }, {});
  }, [product.Variants]);

  const availableSizes = useMemo(() => {
    if (!selectedFlavor || !groupedVariants) return [];

    const sizes = groupedVariants[selectedFlavor].flatMap(
      (variant) => variant.Sizes
    );

    const uniqueSizes = Array.from(
      new Map(
        sizes.map((size) => [size.gram, size])
          .filter((entry): entry is [number, Size] => entry[0] !== undefined)
      ).values()
    );

    return uniqueSizes.sort((a, b) => a.gram! - b.gram!);
  }, [selectedFlavor, groupedVariants]);

  const handleFlavorSelect = (flavor: string, firstSize: Size) => {
    setSelectedFlavor(flavor);
    if (!selectedSize || !availableSizes.some((s) => s.gram === selectedSize.gram)) {
      setSelectedSize(firstSize);
    }
  };

  useEffect(() => {
    // Varyant ve boyuta göre doğru fotoğrafı seç
    const currentVariant = product.Variants?.find(
      (variant) => variant.flavor === selectedFlavor
    );

    const photo = currentVariant?.photo_src || currentVariant?.photo_src || "";
    setSelectedPhoto(photo);
  }, [selectedFlavor, selectedSize, product.Variants]);

  return (
    <Box   sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: 2, // Bileşenler arasında boşluk
    }}>

<Box
   sx={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: { xs: "100%", md: "50%" }, // Görsel için maksimum genişlik
  }}
>
     <ProductImage product={product} selectedPhoto={selectedPhoto} />
    </Box>
      
    <Box
       sx={{
        flex: 2,
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <ProductRating commentCount={product.comment_count} />

      <ProductHeader
        name={product.name || ""}
        shortExplanation={product.short_explanation || ""}
        tags={tags}
      />

      <Divider sx={{ margin: "8px 0" }} />

      {groupedVariants && (
        <FlavorSelector
          groupedVariants={groupedVariants}
          selectedFlavor={selectedFlavor}
          onFlavorSelect={handleFlavorSelect}
        />
      )}

      {availableSizes.length > 0 && (
        <SizeSelector
          availableSizes={availableSizes}
          selectedSize={selectedSize}
          onSizeSelect={setSelectedSize}
        />
      )}

      {selectedFlavor && selectedSize && (
        <Box sx={{ position: "relative" }}>
          <SelectedInfo
            selectedFlavor={selectedFlavor}
            selectedSize={selectedSize}
          />
        </Box>
      )}
       </Box>
    </Box>
  );
};

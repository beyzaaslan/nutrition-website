import React, { useState, useMemo, useEffect } from "react";
import { Box, Grid, Divider } from "@mui/material";
import { Product } from "../../types/Product";
import { Variant } from "../../types/Variant";
import { Size } from '../../types/Size';
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

  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.Variants?.[0]?.flavor ?? "");
  const [selectedSize, setSelectedSize] = useState<Size | null>(product.Variants?.[0]?.Sizes[0] ?? null);
  const [selectedPhoto, setSelectedPhoto] = useState<string>(product.Variants?.[0]?.photo_src || "");
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(product.Variants?.[0] ?? null);
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
    const currentVariant = product.Variants?.find(
      (variant) =>variant.flavor === selectedFlavor && variant.Sizes.some((size) => size.gram === selectedSize?.gram));
      setSelectedVariant(currentVariant || null);
      const photo = currentVariant?.photo_src || ""; 
    setSelectedPhoto(photo);
  }, [selectedFlavor, selectedSize, product.Variants]);

  return (
    <Grid container spacing={2}>
      {/* Görsel Kısmı - 7/12 alan */}
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ProductImage product={product} selectedPhoto={selectedPhoto} />
        </Box>
      </Grid>

      {/* Detay Kısmı - 5/12 alan */}
      <Grid item xs={12} md={5}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            height: "100%",
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

          {selectedFlavor && selectedSize && selectedVariant && (
            <Box sx={{ position: "relative" }}>
              <SelectedInfo
                selectedFlavor={selectedFlavor}
                selectedSize={selectedSize}
                priceInfo={selectedVariant.PriceInfos[0]} // PriceInfos olarak düzeltildi
              />
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
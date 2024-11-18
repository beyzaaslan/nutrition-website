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
import { PriceInfo } from '../../types/PriceInfo';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {

  const [selectedPriceInfo, setSelectedPriceInfo] = useState<PriceInfo | null>();
  const [selectedFlavor, setSelectedFlavor] = useState<string>(product.Variants?.[0]?.flavor ?? "");
  const [selectedSize, setSelectedSize] = useState<Size | null>(product.Variants?.[0]?.Sizes[0] ?? null);
  const [selectedPhoto, setSelectedPhoto] = useState<string>(product.Variants?.[0]?.photo_src || "");
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
    const currentVariant = product.Variants?.find((variant) => variant.flavor === selectedFlavor);
    console.log("currentVariant",currentVariant?.id)
    const photo = currentVariant?.photo_src || currentVariant?.photo_src || "";
    setSelectedPhoto(photo);
 

   // PriceInfo eşleşmesi
   //Bu satırın amacı, seçilen variant (çeşit) ve size (boyut) ile eşleşen doğru fiyat bilgisini bulmaktır. Parçalayarak açıklayalım:
  const matchedPriceInfo = currentVariant?.someMappedId == currentVariant?.Size?.values
 console.log("currentVariant.someMappedId",currentVariant?.Size?.values);
      // 1. currentVariant'in Sizes listesinde, kullanıcı tarafından seçilen size'ın id'sine eşleşen bir size var mı kontrol ediliyor.
            // Aynı zamanda PriceInfo'daki VariantId, currentVariant'in id'sine eşleşiyor mu?
    setSelectedPriceInfo(matchedPriceInfo);
  },[selectedFlavor, selectedSize, product.Variants,selectedPriceInfo]);

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

          {selectedFlavor && selectedSize && (
            <Box sx={{ position: "relative" }}>
              <SelectedInfo
                selectedFlavor={selectedFlavor}
                selectedSize={selectedSize}
              />
            </Box>
          )}
          <Box>
            Fiyat:
            {selectedPriceInfo?.total_price ? `${selectedPriceInfo.total_price} ₺` : "Bilgi bulunamadı"}
            </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

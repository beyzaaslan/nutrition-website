import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GlassMagnifier } from "react-image-magnifiers";
import { Product } from '../../types/Product';

export interface ProductImageProps {
  product: Product;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  const imgSrc = `https://fe1111.projects.academy.onlyjs.com${product.photo_src}`;

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        position: "relative",
      }}
    >
      <GlassMagnifier
        imageSrc={imgSrc}
        imageAlt="Product Image"
        largeImageSrc={imgSrc} // Büyük resim kaynağı (zoom)
        magnifierSize="60%" // Büyütecin boyutu
        magnifierBorderSize={5} // Büyütecin kenarlık kalınlığı
        magnifierBorderColor="rgba(255, 255, 255, .5)" // Büyütecin kenarlık rengi
        square={true} // Büyüteç şekli kare olarak ayarlanır
      />
    </div>
  );
};

export default ProductImage;

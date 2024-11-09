import React from 'react';

interface ProductImageProps {
  imageUrl: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl }) => {
  return <img src={imageUrl} alt="Product" style={{ width: '100%' }} />;
};

export default ProductImage;

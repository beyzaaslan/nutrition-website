import React from 'react';
/* ProductTitle.tsx: Ürün başlığı, puanı ve yorum sayısını gösterir. */
interface ProductTitleProps {
  title: string;
  rating: number;
  reviews: number;
}

const ProductTitle: React.FC<ProductTitleProps> = ({ title, rating, reviews }) => (
  <div>
    <h2>{title}</h2>
    <p>Rating: {rating} ({reviews} reviews)</p>
  </div>
);

export default ProductTitle;

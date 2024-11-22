import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import { ProductDetails } from "../components/ProductDetail/ProductDetail";
import Box from "@mui/material/Box";
import { getProductById } from "../services/productService";

const Detail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const productData = await getProductById(Number(productId));
          setProduct(productData);
        }
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) {
    return <div>Error fetching product: {error.message}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Box sx={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }}>
    <ProductDetails product={product} />
    </Box>
    </>
  );
};

export default Detail;

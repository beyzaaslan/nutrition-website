import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photo_src: string;
  // Add other product fields as needed
}

const Detail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const productData = await getProductById(Number(productId));
          console.log("Product data:", productData);
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
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Price:</strong> {product.price}</p>
      <img src={product.photo_src} alt={product.name} />
    </div>
  );
};

export default Detail;

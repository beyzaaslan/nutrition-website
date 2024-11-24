import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import { Review } from "../types/Review";
import { ProductDetails } from "../components/ProductDetail/ProductDetail";
import { getProductById } from "../services/productService";
import { getReviewsForProduct, createReview } from "../services/reviewService";
import Box from "@mui/material/Box";
import CommentList from '../components/Review/ReviewList/CommentList';
import CommentForm from '../components/Review/ReviewList/CommentForm';

const Detail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        if (productId) {
          setLoading(true); // Start loading
          const [productData, reviewsData] = await Promise.all([
            getProductById(Number(productId)),
            getReviewsForProduct(Number(productId)),
          ]);
          setProduct(productData);
          setComments(reviewsData);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProductAndReviews();
  }, [productId]);

  const handleAddReview = async (rating: number, description: string) => {
    if (!productId) return;
    try {
      // Yeni bir yorum oluştur
      const reviewData: Review = {
        productId: Number(productId),
        rating,
        description,
        createdAt: new Date().toISOString(),
        id: 0, // You may set this properly based on your API response
        updatedAt: "",
      };
      await createReview(reviewData);

      // Add new review to the current list
      setComments((prevComments) => [
        ...prevComments,
        { ...reviewData, id: prevComments.length + 1 }, // Assuming id is assigned after creation
      ]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Yorum eklenirken bir hata oluştu.");
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ProductDetails product={product} />
      </Box>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <h2>Yorumlar</h2>
        <CommentList comments={comments} />
      </Box>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <h2>Yorum Yap</h2>
        <CommentForm onSubmit={handleAddReview} />
      </Box>
    </>
  );
};

export default Detail;

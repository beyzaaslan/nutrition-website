import React from 'react';
import { CardContent, Card, CardMedia } from '@mui/material';
import StarRating from '../StarRating/StarRating';
import { Product } from '../../types/Product';
import Typography from '@mui/material/Typography';

interface ProductCardProps {
    product: Product;
}
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
      <Card sx={{
        justifyContent:'center',
        cursor: "pointer",
        height: "440px", 
        boxShadow: "none",
        display: 'flex',
        flexDirection: 'column', 
        borderRadius: 'none',
        width:'90%',
        objectFit: "fill", 
      }}>
<CardMedia
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    height: "60%", 
    width: "100%",
    objectFit: "fill", 
  }}
  component="img"
  image={product.photo_src || "" }
  alt={product.name || "product"}
/>

        <CardContent sx={{
          textAlign: "center",
          flex: 1, 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          overflow: "hidden", 
          
        }}>
          <Typography variant="h6" sx={{
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', 
            lineHeight: '1.2rem',
          }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', 
            lineHeight: '1.2rem', 
          }}>
            {product.short_explanation}
          </Typography>
          <Typography variant="body2" sx={{
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            lineHeight: '1.2rem', 
          }}>
            <StarRating value={4} />
          </Typography>
          <Typography variant="body2" sx={{
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', // Allow text to wrap
            lineHeight: '1.2rem', // Control line height for better spacing
          }}>
            {product.comment_count} Yorum
          </Typography>
        <Typography variant="h6" sx={{
            fontSize: "1.5rem",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', // Allow text to wrap
            lineHeight: '1.2rem', // Control line height for better spacing
          }}>
           {/*   {product.priceInfo.total_price} TL */}
          </Typography> 
        </CardContent>
      </Card>
    );
};

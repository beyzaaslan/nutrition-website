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
        height: "440px", // Fixed height for all cards
        boxShadow: "none",
        display: 'flex',
        flexDirection: 'column', // Stack children vertically
        borderRadius: 'none',
        width:'90%',
      }}>
<CardMedia
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Dikey ortalamak için eklendi
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    height: "60%", // Sabit yükseklik
    width: "100%", // Kapsayıcı genişlik
    objectFit: "fill", // Görseli tam olarak doldurur
  }}
  component="img"
  image={product.photo_src}
  alt={product.name}
/>

        <CardContent sx={{
          textAlign: "center",
          flex: 1, // Take up remaining space
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Space content evenly
          alignItems: 'center',
          padding: '16px', // Add padding for better spacing
          overflow: "hidden", // Ensure no scrollbars appear
        }}>
          <Typography variant="h6" sx={{
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', // Allow text to wrap
            lineHeight: '1.2rem', // Control line height for better spacing
          }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', // Allow text to wrap
            lineHeight: '1.2rem', // Control line height for better spacing
          }}>
            {product.short_explanation}
          </Typography>
          <Typography variant="body2" sx={{
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal', // Allow text to wrap
            lineHeight: '1.2rem', // Control line height for better spacing
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

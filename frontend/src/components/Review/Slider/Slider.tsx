import React, { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StarRating from '../../StarRating/StarRating';
import { useTheme, useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';

interface Review {
  date: string;
  title: string;
  content: string;
  rating: number;
}

const AutoPlaySlider: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const theme = useTheme();
  
  // Media queries for responsive behavior
  const isLg = useMediaQuery(theme.breakpoints.up('lg')); // Large screens
  const isMd = useMediaQuery(theme.breakpoints.up('md')); // Medium screens
  const isSm = useMediaQuery(theme.breakpoints.down('sm')); // Small screens (sm ve altı için)

  const reviews: Review[] = [
    { date: '03/08/24', title: 'Beğendim gayet güzeldi', content: 'Ürün gayet güzel ama eksikliği bi süreden sonra başağrıyor insanı tepeakülür.', rating: 4.5 },
    { date: '03/08/24', title: 'Beğendim gayet güzeldi', content: 'Ürün gayet güzel ama eksikliği bi süreden sonra başağrıyor insanı tepeakülür.', rating: 4.5 },
    { date: '03/08/24', title: 'Beğendim gayet güzeldi', content: 'Ürün gayet güzel ama eksikliği bi süreden sonra başağrıyor insanı tepeakülür.', rating: 4.5 },
    { date: '03/08/24', title: 'Beğendim gayet güzeldi', content: 'Ürün gayet güzel ama eksikliği bi süreden sonra başağrıyor insanı tepeakülür.', rating: 4.5 }
  ];

  // Configure settings based on screen size
  const settings = {
    infinite: true,
    slidesToShow: isLg ? 4 : isMd ? 3 : isSm ? 2 : 3, // Adjust slidesToShow based on screen size
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleMouseEnter = () => {
    sliderRef.current?.slickPause();
  };

  const handleMouseLeave = () => {
    sliderRef.current?.slickPlay();
  };

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mx: { xs: 2, sm: 4, md: 8, lg: 16 },
        my: { xs: 4, md: 3 },
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: { xs: 'left', md: 'left' }, ml: 2  }}>
          GERÇEK MÜŞTERİ YORUMLARI
        </Typography>
        <Box sx={{ 
  display: 'flex', 
  flexDirection: { xs: 'column', md: 'row' }, // Mobilde dikey, diğer ekranlarda yatay
  alignItems: 'center' 
}}>
        <Box sx={{ display: 'flex', alignItems: 'center' ,}}>
          <Box>
          <Box sx={{display: 'flex', 
          flexDirection: { xs: 'row', md: 'row' }, // Mobilde dikey, diğer ekranlarda yatay
          alignItems: 'center'  }}>
            <Box>
          <StarRating value={2}  />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Typography
  variant="body2"
  sx={{
    position: 'relative',
    display: 'inline-block',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: -2, // Alt çizgi ile metin arasındaki uzaklık
      width: '100%',
      height: '1px', // Alt çizginin kalınlığı
      backgroundColor: 'black', // Alt çizginin rengi
      zIndex: -1, // Alt çizginin metnin arkasında olması için
    },
  }}
>
  100 Yorum
</Typography>
          </Box>
        </Box>
          </Box>
            <ArrowBackIosIcon onClick={handlePrev} sx={{ ml: 1, fontSize: '1.5rem', color: '#56575F', cursor: 'pointer' }} />
            <ArrowForwardIosIcon onClick={handleNext} sx={{ ml: 1, fontSize: '1.5rem', color: '#56575F', cursor: 'pointer' }} />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ border: '2px solid #E3E3E3', mb: 2, mx: { xs: 2, sm: 4, md: 8, lg: 18 } }} />
      <Box
        sx={{
          maxWidth: '100%',
          mx: 'auto',
          px: { xs: 2, md: 11 },
          position: 'relative',
          boxShadow: 'none',
          display: 'flex',
          justifyContent: 'center'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box sx={{ overflow: 'hidden', width: '100%', maxWidth: { xs: 'calc(100% - 20px)', md: 'calc(100% - 60px)' } }}>
          <Slider ref={sliderRef} {...settings}>
            {reviews.map((review, index) => (
              <Box key={index} sx={{ px: 1 }}>
                <Box className="slider-item" sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}>
                  <Typography variant="body2" color="textSecondary"sx={{ fontStyle: 'italic' }}>{review.date}</Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>{review.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{review.content}</Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>{review.rating} ★</Typography>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </>
  );
}

export default AutoPlaySlider;
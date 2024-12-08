import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import { getReviews } from '../../../services/reviewService';
import { Review } from '../../../types/Review';

const AutoPlaySlider: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const theme = useTheme();

  // Media queries for responsive behavior
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(); // API'den yorumları al
        console.log(data);
        setReviews(data.data); // Yorumları state'e ata
      } catch (error) {
        console.error("Yorumlar alınırken bir hata oluştu:", error);
      }
    };
    fetchReviews();
  }, []);

  // Slider ayarları
  const settings = {
    infinite: true,
    slidesToShow: isLg ? 4 : isMd ? 3 : isSm ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const handleNext = () => sliderRef.current?.slickNext();
  const handlePrev = () => sliderRef.current?.slickPrev();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: { xs: 2, sm: 4, md: 8, lg: 16 }, my: { xs: 4, md: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: { xs: 'left', md: 'left' }, ml: 2 }}>
          GERÇEK MÜŞTERİ YORUMLARI
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center',color:"black" }}>
          <ArrowBackIosIcon onClick={handlePrev} sx={{ ml: 1, fontSize: '1.5rem', color: '#56575F', cursor: 'pointer' }} />
          <ArrowForwardIosIcon onClick={handleNext} sx={{ ml: 1, fontSize: '1.5rem', color: '#56575F', cursor: 'pointer' }} />
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
          justifyContent: 'center',
        }}
      >
        <Box sx={{ overflow: 'hidden', width: '100%', maxWidth: { xs: 'calc(100% - 20px)', md: 'calc(100% - 60px)' } }}>
          <Slider ref={sliderRef} {...settings}>
            {reviews.map((review) => (
              <Box key={review.id} sx={{ px: 1 }}>
                <Box className="slider-item" sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  cursor: 'pointer',
                  textAlign: 'left',
                  color:"black"
                }}>
                  <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>{review.createdAt}</Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>{review.rating} ★</Typography>
                  <Typography variant="body2" sx={{ mt: 1,color:"black" }}>{review.description}</Typography>

                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </>
  );
};

export default AutoPlaySlider;

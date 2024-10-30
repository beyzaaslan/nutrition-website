// components/ProductBenefits.tsx
import React from 'react';
import { Box } from '@mui/material';

const ProductBenefits: React.FC = () => (
  <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
    <Box style={{ display: 'flex', alignItems: 'center', margin: '14px' }}>
      <img src="../../public/assets/Detail/car.png" alt="car" />
      <span style={{ margin: '15px' }}>Aynı Gün Ücretsiz Kargo</span>
    </Box>
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <img src="../../public/assets/Detail/happy-customer.png" alt="" />
      <span style={{ margin: '15px' }}>750.000+ Mutlu Müşteri</span>
    </Box>
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <img src="../../public/assets/Detail/satisfaction-guarantee.png" alt="" />
      <span style={{ margin: '15px' }}>100% Memnuniyet Garantisi</span>
    </Box>
  </Box>
);

export default ProductBenefits;
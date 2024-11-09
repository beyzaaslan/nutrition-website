import React from 'react';
import { Variant } from '../../types/Product';

interface PriceDisplayProps {
  variant: Variant | null;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ variant }) => (
  <div>
    {variant && (
      <>
        <p>Price: ${variant.price}</p>
        {variant.discount && <p>Discounted Price: ${variant.price - variant.discount}</p>}
      </>
    )}
  </div>
);

export default PriceDisplay;

import React from 'react';
import { Variant } from '../../types/Product';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelectVariant: (variant: Variant) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({ variants, selectedVariant, onSelectVariant }) => {
  return (
    <ToggleButtonGroup
      value={selectedVariant?.id || null}
      exclusive
      onChange={(event, variantId) => {
        const variant = variants.find(v => v.id === variantId);
        if (variant) onSelectVariant(variant);
      }}
    >
      {variants.map(variant => (
        <ToggleButton key={variant.id} value={variant.id}>
          {variant.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default VariantSelector;

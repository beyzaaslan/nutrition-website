import React, { useState } from 'react';
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';
import { Address } from '../../types/Address';
import { useAddress } from '../../context/AddressContext';
import AddressForm from '../AccountInfo/AddressForm';

interface AddressSelectionProps {
  onAddressSelect?: (address: Address) => void;
}

const AddressSelection: React.FC<AddressSelectionProps> = ({ onAddressSelect }) => {
  const { addresses, loading, addAddress, selectAddress, selectedAddress } = useAddress();
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const addressId = Number(event.target.value);
    const address = addresses.find((addr) => addr.id === addressId);
    if (address) {
      selectAddress(address);
    }
  };

  const handleNewAddressSubmit = async (newAddress: Address) => {
    try {
      const createdAddress = await addAddress(newAddress);
      setShowAddressForm(false);
      if (onAddressSelect) {
        onAddressSelect(createdAddress);
      }
    } catch (error) {
      console.error('Error adding address', error);
    }
  };

  const handleProceed = () => {
    if (selectedAddress && onAddressSelect) {
      onAddressSelect(selectedAddress);
    }
  };

  if (loading) {
    return <Typography>Yükleniyor...</Typography>;
  }

  if (showAddressForm) {
    return (
      <AddressForm
        onSubmit={handleNewAddressSubmit}
        onCancel={() => setShowAddressForm(false)}
        className="address-form"
      />
    );
  }

  return (
    <Box sx={{ paddingX: 3, paddingY: 2, maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        Teslimat Adresi
      </Typography>
      {addresses.length === 0 ? (
        <Box>
          <Alert severity="info" sx={{ backgroundColor: '#f4f1ff', border: '1px solid #9C27B0' }}>
            Kayıtlı bir adresiniz yok. Lütfen aşağıdaki kısımdan adres oluşturunuz.
          </Alert>
          <Button
            variant="contained"
            onClick={() => setShowAddressForm(true)}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              mt: 1,
              fontSize: '0.875rem',
            }}
          >
            Yeni Adres Ekle
          </Button>
        </Box>
      ) : (
        <Box>
          <RadioGroup value={selectedAddress?.id || ''} onChange={handleAddressChange} sx={{ mt: 2 }}>
            {addresses.map((address) => (
              <FormControlLabel
                key={address.id}
                value={address.id}
                control={<Radio />}
                label={`${address.address_line1}, ${address.city}, ${address.state}`}
              />
            ))}
          </RadioGroup>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => setShowAddressForm(true)}
              sx={{ color: 'black', borderColor: 'black', fontSize: '0.875rem' }}
            >
              Yeni Adres Ekle
            </Button>
            <Button
              variant="contained"
              onClick={handleProceed}
              disabled={!selectedAddress}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                fontSize: '0.875rem',
                '&:disabled': {
                  backgroundColor: '#e0e0e0',
                  color: '#a0a0a0',
                },
              }}
            >
              Devam Et
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AddressSelection;

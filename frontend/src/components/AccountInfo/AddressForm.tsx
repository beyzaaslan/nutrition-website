import React, { useEffect, useState } from "react";
import { getCurrentUser } from '../../services/me';  // Make sure this imports correctly
import { Box, Typography, Alert, Button, Grid, TextField } from '@mui/material';
import { User } from "../../types/User";
import { Address } from "../../types/Address";
import { useAddress } from '../../context/AddressContext';
import Cookies from 'js-cookie';

interface AddressFormProps {
  initialAddress?: Address;
  onSubmit?: (address: Address) => Promise<void>;
  onCancel?: () => void;
  className?: string; 

}

const AddressForm: React.FC<AddressFormProps> = ({ 
  initialAddress, 
  onSubmit, 
  className,
}) => {
  const { addAddress, updateExistingAddress, addresses } = useAddress();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Address>({address_line1: '',address_line2: '',city: '',state: '',postal_code: '',country: 'Turkey',is_primary: false,...(initialAddress || {}),});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get('x-auth-token');
        console.log("tokenbeyza",token)
        if (token) {
          const currentUser = await getCurrentUser(); 
          setUser(currentUser.id);
          console.log("setUser",currentUser);
          setFormData((prevFormData) => ({
            ...prevFormData,
            UserId: currentUser.user,
          }));
        } else {
          console.error("No token found.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!initialAddress) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [initialAddress]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (onSubmit) {
        await onSubmit(formData);
        return;
      }

      if (user) {
        if (initialAddress) {
          await updateExistingAddress(initialAddress.id!, formData);
        } else {
          await addAddress(formData);
        }
        setFormData({address_line1: '',address_line2: '',city: '',state: '',postal_code: '',country: 'Turkey',is_primary: false,UserId: user.id,});
      }
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  if (!user) {
    return (
      <Box>
        <Typography variant="h6">Adres Oluştur</Typography>
        <Alert severity="info">
          Adres işlemleri için lütfen giriş yapın.
        </Alert>
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {initialAddress ? 'Adresi Düzenle' : 'Adres Oluştur'}
      </Typography>
      {!initialAddress && addresses.length === 0 && (
        <Alert
        severity="info"
        sx={{ backgroundColor: "#f4f1ff", border: "1px solid #9C27B0" }}
      >
        Kayıtlı bir adresiniz yok. Lütfen aşağıdaki kısımdan adres
        oluşturunuz.
      </Alert>
      )}
      <form onSubmit={handleSubmit}  className={className}>
      <Grid container spacing={1} sx={{ marginTop: 1 }}>
      <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *Adres Başlığı
              </Typography>
              <TextField
                onChange={handleInputChange}
                fullWidth
                name="address_line1"
                value={formData.address_line1}
                placeholder="ev, iş vb..."
                variant="outlined"
                required
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
            <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *Ad
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="name"
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *Soyad
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="lastName"
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *Adres
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="address_line2"
                value={formData.address_line2}
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *Şehir
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="city"
                value={formData.city}
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "500", color: "#222222" }}
              >
                *İlçe
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="state"
                value={formData.state}
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ marginY: "2px", fontWeight: "500", color: "#222222" }}
              >
                *Telefon
              </Typography>
              <TextField
                required
                onChange={handleInputChange}
                fullWidth
                name="phone"
                variant="outlined"
                sx={{
                  backgroundColor: "#F7F7F7",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#E5E5E5" },
                  },
                }}
              />
            </Grid>
          </Grid>

        <Box textAlign="right" mt={3}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "black",
              color: "white",
              marginBottom: "2rem",
              "&:hover": { backgroundColor: "darkblack" },
            }}
          >
            Kaydet
          </Button>
        </Box>
      </Grid>
       
      </form>
    </Box>
  );
};

export default AddressForm;

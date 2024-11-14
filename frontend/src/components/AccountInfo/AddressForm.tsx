import { useState, useEffect } from "react";
import { Box, Grid, Button, Alert, Typography, TextField } from "@mui/material";
import { createAddress } from "../../services/addressService";
import { getCurrentUser } from '../../services/authService';

// Address form data type
interface AddressFormData {
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  UserId?: undefined; // UserId is optional
}

interface AddressFormProps {
  onAddressAdded: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddressAdded }) => {
  const [formData, setFormData] = useState<AddressFormData>({
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    UserId: undefined,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await getCurrentUser();
        setFormData((prevData) => ({
          ...prevData,
          UserId: user?.id,
        }));
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchUserId();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { UserId, ...addressData } = formData;
    if (UserId !== undefined) {
      try {
        await createAddress({ ...addressData, UserId });
        console.log("Address added successfully");
        onAddressAdded();
        setFormData({
          address_line1: "",
          address_line2: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
          UserId,
        });
      } catch (error) {
        console.error("Error adding address", error);
      }
    } else {
      console.error("UserId is not defined");
    }
  };

  return (
    <Box sx={{ paddingX: 6 }}>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Create Address
        </Typography>
        <Alert
          severity="info"
          sx={{ backgroundColor: "#f4f1ff", border: "1px solid #9C27B0" }}
        >
          No address found. Please create one below.
        </Alert>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address_line1"
              label="Address Line 1"
              value={formData.address_line1}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address_line2"
              label="Address Line 2"
              value={formData.address_line2}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formData.city}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={formData.state}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="postal_code"
              label="Postal Code"
              value={formData.postal_code}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="country"
              label="Country"
              value={formData.country}
              onChange={handleInputChange}
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
      </form>
    </Box>
  );
};

export default AddressForm;

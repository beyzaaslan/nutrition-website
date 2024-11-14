/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AddressForm from "./AddressForm";
import { Card, CardContent, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface Address {
  label: string;
  id: number;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  UserId: number;
}

const Address = () => {
  const [editAddressId, setEditAddressId] = useState<number | null>(null);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("authToken");
        if (token) {
          const response = await axios.get("http://localhost:5000/api/auth/me", {
            headers: { "x-auth-token": token },
          });
          setUserId(response.data.user.id);
        } else {
          showLoginToast();
        }
      } catch (error) {
        console.error("Error fetching user info", error);
        setError("Kullanıcı bilgileri alınamadı.");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchAddresses = async () => {
        try {
          const response = await axios.get<Address[]>(`http://localhost:5000/api/address/user/${userId}`);
          setAddresses(response.data);
          console.log("userId",response.data);
        } catch (error) {
          console.error("Adres bilgilerini çekme hatası", error);
          setError("Adres bilgileri alınamadı.");
        } finally {
          setLoading(false);
        }
      };
      fetchAddresses();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const showLoginToast = () => {
    toast.error("Lütfen adres eklemek için üye olunuz.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
      onClose: () => navigate("/login")
    });
  };

  const handleNewAddressClick = () => {
    if (!userId) {
      showLoginToast();
      return;
    }
    setShowAddressForm(true);
    setEditAddressId(null);
    setCurrentAddress(null);
  };

  const handleAddressEdit = (address: Address) => {
    if (!userId) {
      showLoginToast();
      return;
    }
    setShowAddressForm(true);
    setEditAddressId(address.id);
    setCurrentAddress(address);
  };

  const handleAddressAddedOrUpdated = () => {
    setShowAddressForm(false);
    if (userId) {
      axios.get<Address[]>(`http://localhost:5000/api/address/user/${userId}`).then((response) => {
        setAddresses(response.data);
      });
    }
  };

  const handleDeleteAddress = async (address_id: number) => {
    if (!userId) {
      showLoginToast();
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/address/${address_id}`);
      setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== address_id));
    } catch (error) {
      console.error("Adres silinirken hata oluştu:", error);
      setError("Adres silme işlemi başarısız.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Adreslerim
      </Typography>

      <Grid container justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleNewAddressClick}>
          Yeni Adres Ekle
        </Button>
      </Grid>

      <Grid container spacing={2}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} md={4} key={address.id}>
            <Card variant="outlined" sx={{ border: "1px solid #000", p: 2 }}>
              <CardContent>
                <Typography variant="body2" color="text.primary">
                  {address.address_line1}
                  {address.address_line2 && <><br />{address.address_line2}</>}
                  <br />
                  {address.city}, {address.state}
                  <br />
                  {address.postal_code}, {address.country}
                </Typography>
              </CardContent>
              <Grid container justifyContent="space-between" sx={{ pb: 1 }}>
                <Button onClick={() => handleDeleteAddress(address.id)} startIcon={<DeleteIcon />} color="error">
                  Sil
                </Button>
                <Button onClick={() => handleAddressEdit(address)} color="primary">
                  Düzenle
                </Button>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showAddressForm} onClose={() => setShowAddressForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Adres Ekle / Düzenle</DialogTitle>
        <DialogContent>
          <AddressForm onAddressAdded={handleAddressAddedOrUpdated} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddressForm(false)} color="secondary">
            İptal
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Address;

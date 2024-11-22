import React, { useState } from "react";
import {AppBar,Toolbar,InputBase,IconButton,Box,Button,Menu,MenuItem,Typography,Link,Drawer,List,ListItem,ListItemText,Modal} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/Product";
import { searchProducts } from '../../services/productService';
import { useShoppingCart } from '../../context/ShoppingCartContext';


const modalStyle = {
  position: "absolute",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  zIndex: 10,
  borderRadius: "10px",
  top: "2px",
  left: "4%",
};

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 0,
    padding: "0px",
    background: 'red'
  },
}));

const Logo = styled("img")({
  width: "100%",
});

const Header: React.FC = () => {
  const { cartQuantity, setIsOpen } = useShoppingCart();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleSearch = async (term: string) => {if (term.trim() === "") {setOpen(false);setSearchResults([]);return;}

    try {
      const results = await searchProducts(term);
      const sortedResults = results.sort((a: Product, b: Product) => {
        const aStartsWith = a.name.toLowerCase().startsWith(term.toLowerCase());
        const bStartsWith = b.name.toLowerCase().startsWith(term.toLowerCase());
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        
        const aMatchIndex = a.name.toLowerCase().indexOf(term.toLowerCase());
        const bMatchIndex = b.name.toLowerCase().indexOf(term.toLowerCase());

        return aMatchIndex - bMatchIndex;
      });
      
      setSearchResults(sortedResults);
      setOpen(true);
    } catch (error) {
      console.error("Arama hatası:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    handleSearch(term);
    setSearchTerm(term);
  };

  const handleProductClick = (product: Product): void => {
    navigate(`/product/${product.id}`);
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };



  return (
    <>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          justifyContent: "center",
          boxShadow: "none",
          height: { xs: "auto", sm: "175px", md: "169px" },
          background:'#fff'
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: 0,
          }}
        >
          <Box
            sx={{
              flexDirection: { xs: "column", sm: "row", md: "row" },
              display: "flex",
              justifyContent: {
                xs: "space-around",
                sm: "space-between",
                md: "space-between",
              },
              width: { xs: "88%", sm: "80%", md: "80%" },
              alignItems: "center",
              mb: { xs: "0px", sm: "20px", md: "20px" },
            }}
          >
            {/* Wrapper for Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: { xs: "120%", sm: "15%", md: "15%" },
                marginTop: { xs: "5%", sm: "0", md: "0" },
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
                sx={{ display: { xs: "flex", sm: "none", md: "none" } }}
              >
                <MenuIcon sx={{color:'black'}} />
              </IconButton>
              <Logo
                src="/assets/blacklogo.png"
                alt="Logo"
                sx={{
                  width: { xs: "100px", sm: "150%", md: "120%" },
                  marginLeft: { xs: "0", sm: "-80px", md: "0" },
                }}
              />
              <Box
                sx={{
                  display: { xs: "flex", sm: "none", md: "none" },
                  alignItems: "center",
                  width: { xs: "0", sm: "15%", md: "15%" },
                }}
              >
                <StyledBadge badgeContent={1} color="secondary">
                  <ShoppingCartIcon sx={{color:'black'}} />
                </StyledBadge>
              </Box>
            </Box>
            {/* Wrapper for Search Bar */}
            <Box
              sx={{
                width: { xs: "100%", sm: "35%", md: "40%" },
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: { xs: "25px", sm: "0", md: "0" },
                mb: { xs: "10px", sm: "0", md: "0" },
              }}
            >
              <Box
                sx={{
                  borderRadius: { xs: "100px", sm: "4px", md: "4px" },
                  display: "flex",
                  width: { xs: "100%", sm: "100%", md: "100%" },
                  border: {
                    xs: "none",
                    sm: "2px solid #a9a2a2",
                    md: "2px solid #a9a2a2",
                  },
                  backgroundColor: { xs: "#F3F3F3", sm: "#fff", md: "#fff" },
                  overflow: "hidden",
                }}
              >
                <InputBase
                  value={searchTerm}
                  onChange={handleInputChange}
                  sx={{
                    "&::placeholder": {
                      fontSize: { xs: "0", sm: "14px", md: "16px" }, // Ekran boyutuna göre font boyutu
                    },
                    flex: 1,
                    paddingLeft: "8px",
                    height: "45px",
                  }}
                  placeholder="Aradığınız ürünü yazınız"
                  inputProps={{ "aria-label": "search" }}
                />
                <Button
                  onClick={() => handleSearch(searchTerm)}
                  variant="contained"
                  sx={{
                    width: { xs: "100%", sm: "0px", md: "20%" },
                    backgroundColor: "#919191",
                    height: "45px",
                    display: { xs: "none", sm: "flex", md: "flex" },
                    borderRadius: { xs: "100px", sm: "4px", md: "0px" },
                  }}
                >
                  ARA
                </Button>
              </Box>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                disableEnforceFocus
                disableAutoFocus
                sx={{
                  position: "absolute",
                  top: "11%", // Modal'ı InputBase'in altına yerleştir
                  left: "30%",
                  width: "33%", // Genişliği InputBase ile aynı yap
                  height: "40%",
                  zIndex: 10, // Modal'ın diğer elementlerin üstünde olması için
                }}
              >
                <Box sx={modalStyle}>
                  <List>
                    {searchResults.map((product) => (
                      <ListItem
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                      >
                        <ListItemText primary={product.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Modal>
            </Box>
            {/* Wrapper for Account and Cart Buttons */}
            <Box
              sx={{
                width: { xs: "100%", sm: "auto", md: "auto" },
                display: { xs: "none", sm: "flex", md: "flex" },
                alignItems: "center",
                justifyContent: "flex-end",
                gap: { xs: "10px", sm: "15px", md: "15px" },
                flexWrap: "nowrap",
              }}
            >
              <Button
                variant="contained"
                startIcon={<PersonOutlineOutlinedIcon />}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
                sx={{
                  color: "#919191",
                  backgroundColor: "#fff",
                  textTransform: "none",
                  height: "46px",
                  minWidth: "125px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Hesap
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profil</MenuItem>
                <MenuItem onClick={handleClose}>Hesabım</MenuItem>
                <MenuItem onClick={handleClose}>Çıkış</MenuItem>
              </Menu>
              <Button
              onClick={() => setIsOpen(true)}
               variant="contained"
                sx={{
                  backgroundColor: "#919191",
                  color: "#fff",
                  textTransform: "none",
                  height: "46px",
                  minWidth: "115px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  padding: "0 12px",
                }}
              >
                <StyledBadge badgeContent={cartQuantity} color="secondary">
                  <ShoppingCartIcon>
                  {cartQuantity}
                  </ShoppingCartIcon>
                </StyledBadge>
                <Typography sx={{ ml: 1 }}>SEPET</Typography>
              </Button>
            </Box>
          </Box>
        </Toolbar>
        <Box sx={{ display: { xs: "none", sm: "block", md: "block" } }}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#333",
              padding: "10px 0",
              justifyContent: "space-evenly",
              "& a": { color: "white", textDecoration: "none" },
              "& a:hover": { textDecoration: "underline" },
            }}
          >
            <Link href="#">PROTEİN</Link>
            <Link href="#">SPOR GIDALARI</Link>
            <Link href="#">SAĞLIK</Link>
            <Link href="#">GIDA</Link>
            <Link href="#">VİTAMİN</Link>
            <Link href="#">KARBONHİDRATLAR</Link>
            <Link href="#">TÜM ÜRÜNLER</Link>
          </Box>
        </Box>
      </AppBar>
      {/* Mobil Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          display: { xs: "block", sm: "none", md: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "#fff",
            width: "100%",
            maxWidth: "320px",
            height: "calc(100% - 120px)", // Belirli bir yüksekliği tanımlar
            color: "#000000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Üst ve alt container'ları ayırmak için
          },
        }}
      >
        {/* Üst Kısım: Kategori Listesi */}
        <Box sx={{ flex: "1", backgroundColor: "#fff", overflowY: "auto" }}>
          <List>
            <ListItem>
              <ListItemText primary="PROTEİN" />
              <Typography sx={{ color: "black", fontSize: "20px" }}>
                <ArrowForwardIosIcon />
              </Typography>{" "}
              {/* Kırmızı renkte > ikonu */}
            </ListItem>
            <ListItem>
              <ListItemText primary="SPOR GIDALARI" />
              <Typography sx={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="SAĞLIK" />
              <Typography sx={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="GIDA" />
              <Typography sx={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="VİTAMİN" />
              <Typography sx={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="TÜM ÜRÜNLER" />
              <Typography sx={{ color: "black" }}>
                <ArrowForwardIosIcon />
              </Typography>
            </ListItem>
          </List>
        </Box>

        {/* Alt Kısım: Diğer Linkler */}
        <Box
          sx={{
            padding: "10px 0",
            textAlign: "center",
            color: "black",
            backgroundColor: "#E5E5E5",
          }}
        >
          <List>
            <ListItem>
              <ListItemText primary="Hesabım" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Müşteri Yorumları" />
            </ListItem>
            <ListItem>
              <ListItemText primary="İletişim" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
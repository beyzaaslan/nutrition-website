// CartItem.tsx
import Stack from "@mui/material/Stack";
import { Button, Typography, Box } from "@mui/material";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { Product } from "../../../types/Product";
import { Variant } from '../../../types/Variant';

type CartItemProps = {
    id: number;
    quantity: number;
    product: Product;
    selectedVariant:Variant;
}

export function CartItem({ id, quantity, product, selectedVariant }: CartItemProps) {
    const { removeFromCart, increaseCartAmount, decreaseCartAmount } = useShoppingCart();
    // Varyant ve fiyat bilgisini al
    console.log("selectedVariant",selectedVariant.id)
    const priceInfo = selectedVariant?.PriceInfos[0];
    // Eğer varyant veya fiyat bilgisi yoksa null döndür
    if (!selectedVariant || !priceInfo) return null;
    const price = priceInfo.discounted_price || priceInfo.total_price;

    return (
         <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center" 
            sx={{ 
                padding: 2,
                borderBottom: '1px solid #eee'
            }}
        >
            <Box sx={{ width: 100, height: 100 }}>
                <img 
                    src={selectedVariant.photo_src} 
                    alt={`${product.name} - ${selectedVariant.flavor}`}
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                    }}
                />
            </Box>
            
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {selectedVariant.flavor} - {selectedVariant.Sizes[0].gram}g
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {price} TL
                </Typography>
                
                <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => decreaseCartAmount(id)}
                    >
                        -
                    </Button>
                    <Typography>{quantity}</Typography>
                    <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => increaseCartAmount(id)}
                    >
                        +
                    </Button>
                    <Button 
                        size="small" 
                        variant="outlined" 
                        color="error"
                        onClick={() => removeFromCart(id)}
                    >
                        Kaldır
                    </Button>
                </Stack>
            </Box>
            
            <Typography variant="h6">
                {(price * quantity).toFixed(2)} TL
            </Typography>
        </Stack>
    );
}

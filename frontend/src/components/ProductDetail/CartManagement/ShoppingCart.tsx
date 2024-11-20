import Drawer from "@mui/material/Drawer";
import { Box, Typography } from "@mui/material";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { getProducts } from "../../../services/productService";
import { useEffect, useState } from "react";
import { Product } from "../../../types/Product";
import { Variant } from '../../../types/Variant';

type ShoppingCartProps = {
    isOpen: boolean;
};

// Define a more specific type for cart items
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CartItemType {
    id: number;
    quantity: number;
    selectedVariant:Variant;
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            if (cartItems.length === 0) return;
            
            setLoading(true);
            setError(null);
            
            try {
                // Get unique product IDs from cart items
                const uniqueProductIds = [...new Set(cartItems.map(item => item.id))];
                
                // Fetch all products in one request
                const allProducts = await getProducts(1, uniqueProductIds.length);
                
                // Filter products to only include those in the cart
                const cartProducts = allProducts.filter(product => 
                    uniqueProductIds.includes(product.id)
                );
                
                setProducts(cartProducts);
            } catch (error) {
                console.error('Error loading cart products:', error);
                setError('Failed to load cart products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [cartItems]);

    const renderCartContent = () => {
        if (loading) {
            return (
                <Typography sx={{ textAlign: 'center', my: 4 }}>
                    Loading cart items...
                </Typography>
            );
        }

        if (error) {
            return (
                <Typography color="error" sx={{ textAlign: 'center', my: 4 }}>
                    {error}
                </Typography>
            );
        }

        if (cartItems.length === 0) {
            return (
                <Typography sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                }}>
                    Sepetiniz boş
                </Typography>
            );
        }

        return cartItems.map(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return null;

            return (
                <CartItem
                    key={`${item.id}-${item.id || ''}`}
                    product={product}
                    selectedVariant={item || 0}
                    quantity={item.quantity}
                    id={item.id}
                />
            );
        });
    };

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={closeCart}
            sx={{
                '& .MuiDrawer-paper': {
                    width: {
                        xs: '100%',
                        sm: '500px'
                    },
                    boxSizing: 'border-box',
                }
            }}
        >
            <Box sx={{ flex: 1, overflow: 'auto', my: 2 }}>
                {renderCartContent()}
            </Box>
        </Drawer>
    );
}
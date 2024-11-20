import { createContext, ReactNode, useState, useContext } from 'react';
import { ShoppingCart } from '../components/ProductDetail/CartManagement/ShoppingCart';

type CartItem = {
    id: number;
    quantity: number;
    variantId?: number; // variant ID'sini ekledik

}

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemAmount: (id: number) => number;
    increaseCartAmount: (id: number, variantId?: number) => void;
    decreaseCartAmount: (id: number) => void;
    removeFromCart: (id: number) => void;
    CartAmount: number;
    cartItems: CartItem[];
    isOpen:boolean;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const CartAmount = cartItems.reduce((quantity, itemsInCart) => itemsInCart.quantity + quantity,0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemAmount(id: number):number {
        const item = cartItems.find(item => item.id == id);
        console.log("item",item);
        return item ? item.quantity : 0;
    }

    function increaseCartAmount(id: number) {
        setCartItems(currentItems => {
            if (currentItems.find(itemsInCart => itemsInCart.id == id) == null) {
                return [...currentItems, { id, quantity: 1 }];
            } else {
                return currentItems.map(item =>
                    item.id == id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
        });
    }

    function decreaseCartAmount(id: number) {
        setCartItems(currentItems => {
            if (currentItems.find(itemsInCart => itemsInCart.id == id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id);
            } else {
                return currentItems.map(item =>
                    item.id == id 
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
        });
    }

    function removeFromCart(id: number) {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id);
        });
    }

    return (
        <ShoppingCartContext.Provider 
            value={{
                getItemAmount,
                increaseCartAmount,
                decreaseCartAmount,
                removeFromCart,
                cartItems,
                CartAmount,
                openCart,
                closeCart,
                isOpen 
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}
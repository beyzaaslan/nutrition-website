import { CartItem } from '../types/CartItem';
import { useLocalStorage } from '../hooks/useLocalStorage';
import{ createContext, useContext, useState } from 'react';

interface ShoppingCartContextProps {
  getItemAmount: (id: number) => number;
  increaseCartAmount: (id: number, cartItemData: CartItem) => void;
  decreaseCartAmount: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[];
  cartQuantity: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('sepetteki-ürünler', []);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const getItemAmount = (id: number) => {
    return cartItems.find(item => item.id === id)?.quantity || 1;
  };

  const increaseCartAmount = (id: number, cartItemData: CartItem) => {
    setCartItems(currItems => {
      const existingItem = currItems.find(item => item.id === id);
      
      if (!existingItem) {
        return [...currItems, cartItemData];
      }

      return currItems.map(item => {
        if (item.id === id) {
          return { ...cartItemData, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };
  
  const decreaseCartAmount = (id: number) => {
    setCartItems(currItems => {
      const existingItem = currItems.find(item => item.id === id);
      
      if (existingItem?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      }

      return currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(currItems => currItems.filter(item => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider 
      value={{ 
        getItemAmount, 
        increaseCartAmount, 
        decreaseCartAmount, 
        removeFromCart,
        cartItems,
        cartQuantity,
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};



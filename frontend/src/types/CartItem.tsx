// types/CartItem.ts
export type CartItem = {
    id: number;
    variantId: string | number;
    quantity: number;
    name: string;
    photo_src: string;
    price: number;
    flavor: string;
    size: string;
  }
import { PriceInfo } from './PriceInfo';
import { Product } from './Product';
import { Size } from './Size';

// Define the Variant interface
export interface Variant {
  someMappedId: string;
  Sizes: Size[];
  id: string; // UUID
  flavor: string;
  aroma_photo?: string;
  photo_src?: string;
  is_available: boolean;
  Product?: Product; // Association with Product model (optional)
  Size?: Size[];       // Association with Size model (optional)
  PriceInfo?: PriceInfo[]; // Association with PriceInfo model (optional)
}
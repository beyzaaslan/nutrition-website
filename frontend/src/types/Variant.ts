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
<<<<<<< HEAD
  PriceInfos: PriceInfo[];
=======
  Size?: Size[];       // Association with Size model (optional)
  PriceInfo?: PriceInfo[]; // Association with PriceInfo model (optional)
>>>>>>> faff4ad793e898dced2f2e48a0ef597b54bbf1f5
}
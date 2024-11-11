import { PriceInfo } from './PriceInfo';
import { Size } from './Size';
export interface Variant {
  id: string;
  flavor: string;
  photo_src: string | null;
  is_available: boolean;
  productId: number;
  sizeId: number;
  PriceInfo: PriceInfo;
  Size: Size;
}
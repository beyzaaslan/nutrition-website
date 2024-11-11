import { PriceInfo } from './PriceInfo';
import { Category } from './Category';
import { Review } from './Review';
import { Variant } from './Variant';

export interface Product {
    id?: number;
    name: string;
    short_explanation: string;
    slug: string;
    photo_src: string | undefined;
    usage: string;
    features: string;
    description: string;
    comment_count: number;
    average_star: number;
    Categories: Category[];
    Reviews: Review[];
    priceInfo: PriceInfo; 
    variants: Variant;
}

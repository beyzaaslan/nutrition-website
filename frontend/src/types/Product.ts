import { ReactNode } from 'react';
import { PriceInfo } from './PriceInfo';

export interface Product {
    price: ReactNode;
    id?: number;
    name: string;
    short_explanation: string;
    slug: string;
    photo_src: string;
    comment_count: number;
    average_star: number;
    priceInfo: PriceInfo; 
}

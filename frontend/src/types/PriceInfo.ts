export interface PriceInfo {
    id?: number;
    profit: number;
    total_price: number;
    discounted_price?: number;
    price_per_servings: number;
    discount_percentage: number;
    ProductId?: number; // Foreign key
}

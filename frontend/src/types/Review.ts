export interface Review {
    id?: number;
    rating: number;
    description: string;
    UserId?: number; // Foreign key
    ProductId?: number; // Foreign key
}

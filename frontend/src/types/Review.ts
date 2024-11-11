export interface Review {
    id?: number;
    comment: string;
    rating: number;
    description: string;
    UserId?: number; // Foreign key
    ProductId?: number; // Foreign key
    createdAt: string;
}

export interface Order {
    id: number;
    total: number;
    status: string;
    UserId?: number; // Foreign key
}
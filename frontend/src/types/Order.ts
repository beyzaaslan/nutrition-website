export interface Order {
    id?: number;
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    UserId?: number; // Foreign key
}

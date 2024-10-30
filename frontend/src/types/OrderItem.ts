export interface OrderItem {
    id?: number;
    quantity: number;
    price: number;
    OrderId?: number; // Foreign key
    ProductId?: number; // Foreign key
}

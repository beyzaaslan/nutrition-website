export interface Payment {
    id?: number;
    amount: number; // Ödeme tutarı
    orderId?: number; // İlişkili siparişin ID'si
    userId?: number; // İlişkili kullanıcının ID'si
    method: 'credit_card' | 'paypal' | 'bank_transfer'; // Ödeme yöntemi
    status: 'pending' | 'completed' | 'failed'; // Ödeme durumu
}

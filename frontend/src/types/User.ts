export interface User {
    id?: number;
    name: string;
    last_name: string;
    email: string;
    password: string; 
    role: 'admin' | 'user';
}

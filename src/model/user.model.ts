export interface User{
    id: number;
    username: string;
    password: string; // In a real application, store hashed passwords
    role: string;
}
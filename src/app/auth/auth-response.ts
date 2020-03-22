export interface AuthResponse {
    user: {
        id: number,
        name: string;
        lastname: string;
        street: string;
        houseno: string;
        zip: string;
        city: string;
        phone: string;
        email: string;

        token_type: string,
        access_token: string,
        expires_in: number
    }
}
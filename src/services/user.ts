import { Token, User, UserRegister, UserSignIn} from "@/models/user"

class UserService {
    private apiUrl: string;
  
    constructor() {
        this.apiUrl = 'http://localhost:5000/api';
    }

    async currentUser(): Promise<User> {
        const token = localStorage.getItem('access_token');
        if (!token) throw new Error("No token");

        const response = await fetch(`${this.apiUrl}/users/me`, {
            headers: {
                method: 'GET',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to get current user");
        }
        return response.json();
    }

    async login(user_info: UserSignIn): Promise<Token> {
        const response = await fetch(`${this.apiUrl}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: user_info.username,
                password: user_info.password,
            }),
        })

        if (!response.ok) {
            throw new Error('Invalid email or password')
        }
        return response.json()
    }

    async register(user: UserRegister): Promise<User> {
        const response = await fetch(`${this.apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: user.full_name,
                email: user.username,
                password: user.password,
            }),
        })

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.detail || 'Registration failed')
        }
        return response.json()
    }
}

export default new UserService();
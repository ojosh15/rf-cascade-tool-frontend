export interface User {
    id: number;
    full_name: string;
    email: string;
    disabled: boolean;
  }

export interface UserSignIn {
    username: string,
    password: string
}

export interface UserRegister {
    username: string,
    password: string,
    full_name: string
}

export interface Token {
    access_token: string,
    token_type: string
}
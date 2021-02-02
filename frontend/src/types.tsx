export interface UserType {
    username: string
    email: string
}

export interface RegisterUserInput {
    username: string,
    password: string,
    email: string
}

export interface LoginUserInput {
    username: string,
    password: string
}

export interface AuthToken {
    access_token?: string
}
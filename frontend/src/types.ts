export interface UserType {
    username: string|undefined
    email: string|undefined
}

export interface RegisterUserInput {
    username: string
    password: string
    email: string
}

export interface LoginUserInput {
    username: string
    password: string
}

export interface AuthToken {
    access_token?: string
}

export interface AccountInput {
    name: string
    siteUrl: string
    description: string
}

export interface Account {
    id: number
    name: string
    siteUrl: string|undefined
    description: string|undefined
}
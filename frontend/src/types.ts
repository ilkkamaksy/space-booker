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

export interface ServiceInput {
    name: string
    description: string
    maxBookings: number
    startTime: string
    endTime: string
    timeSlotLen: number
    account_id: number
}

export interface Service {
    id: number
    name: string
    description: string
    maxBookings: number
    startTime: string
    endTime: string
    timeSlotLen: number
    account_id: number
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
    services: Service[]
}
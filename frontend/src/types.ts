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

export interface Booking {
    id?: number
    email: string
    date: string
    dateTime: string
    slotNumber: number
    service_id: number
    service?: Service
}

export interface BookingAttributesType {
	id: number
	slotNumber: number
	time: string
	isReserved?: boolean
	isSelected?: boolean
	service: Service
	date: Date|null
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
    bookings?: Booking[]
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
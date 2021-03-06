import { UserType, Account, Booking } from '../types'

export interface UserState {
    user: UserType|undefined
    token: string|undefined
    loggedOut: boolean
    updateUser: boolean
}

export const SET_TOKEN = 'SET_TOKEN'

export interface SetTokenAction {
    type: '@prefix/SET_TOKEN'
    payload: string
}

export const SET_USER = 'SET_USER'

export interface SetUserAction {
    type: '@prefix/SET_USER'
    payload: UserType|undefined
}

export const LOGOUT = 'LOGOUT'

export interface LogoutUserAction {
    type: '@prefix/LOGOUT_USER'
}


export type UserActionTypes = SetTokenAction | SetUserAction | LogoutUserAction



export interface AccountState {
    accounts: Account[]
    updatingAccounts: boolean
}

export interface AddAccountAction {
    type: '@prefix/ADD_ACCOUNT'
    payload: Account
}

export interface RemoveAccountAction {
    type: '@prefix/REMOVE_ACCOUNT'
    payload: Account
}

export interface SetAccountsAction {
    type: '@prefix/SET_ACCOUNTS'
    payload: Account[]
}

export interface SetSingleAccountAction {
    type: '@prefix/SET_SINGLE_ACCOUNT'
    payload: Account
}

export interface InitAccountAction {
    type: '@prefix/START_ACCOUNT_ACTION'
}

export interface DoneAccountAction {
    type: '@prefix/DONE_ACCOUNT_ACTION'
}

export type AccountActionTypes = AddAccountAction | RemoveAccountAction | SetAccountsAction | SetSingleAccountAction | InitAccountAction | DoneAccountAction

export interface InitBookingAction {
    type: '@prefix/START_BOOKING_ACTION'
}

export interface DoneBookingAction {
    type: '@prefix/DONE_BOOKING_ACTION'
}

export interface AddBookingAction {
    type: '@prefix/ADD_BOOKING'
    payload: Booking
}

export interface RemoveBookingAction {
    type: '@prefix/REMOVE_BOOKING'
    payload: Booking
}

export interface SetBookingsAction {
    type: '@prefix/SET_BOOKINGS'
    payload: Booking[]
}

export interface EditBookingsAction {
    type: '@prefix/UPDATE_BOOKINGS'
    payload: Booking[]
}

export interface ResetBookingsAction {
    type: '@prefix/RESET_BOOKINGS'
}

export interface SetDateAction {
    type: '@prefix/SET_SELECTED_DATE'
    payload: Date
}

export interface SetFormVisibilityAction {
    type: '@prefix/SET_FORM_VISIBILITY'
}

export type BookingActionTypes = InitBookingAction | AddBookingAction | RemoveBookingAction | SetBookingsAction | EditBookingsAction | ResetBookingsAction | SetDateAction | SetFormVisibilityAction

export interface BookingState {
    bookings: Booking[]
    updatingBookings: boolean
    selectedDate: Date,
    bookingFormVisible: boolean
}

export interface AppState {
    userdata: UserState
    accountdata: AccountState
    bookingData: BookingState
}
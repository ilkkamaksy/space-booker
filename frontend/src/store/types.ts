import { UserType, Account, Booking } from '../types'

export interface UserState {
    user: UserType|undefined
    token: string|undefined
    loggedOut: boolean
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
    updating: boolean
}

export interface AddAccountAction {
    type: '@prefix/ADD_ACCOUNT'
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

export interface InitAction {
    type: '@prefix/START_ACTION'
}

export interface DoneAction {
    type: '@prefix/DONE_ACTION'
}

export type AccountActionTypes = AddAccountAction | SetAccountsAction | SetSingleAccountAction | InitAction | DoneAction

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

export interface SetDateAction {
    type: '@prefix/SET_SELECTED_DATE'
    payload: Date
}

export interface SetFormVisibilityAction {
    type: '@prefix/SET_FORM_VISIBILITY'
}

export type BookingActionTypes = InitAction | AddBookingAction | RemoveBookingAction | SetBookingsAction | SetDateAction | SetFormVisibilityAction

export interface BookingState {
    bookings: Booking[]
    updating: boolean
    selectedDate: Date,
    bookingFormVisible: boolean
}

export interface AppState {
    userdata: UserState
    accountdata: AccountState
    bookingData: BookingState
}
import { UserType, Account } from '../types'

export interface UserState {
    user: UserType|undefined,
    token: string|undefined
}

export const SET_TOKEN = 'SET_TOKEN'

export interface SetTokenAction {
    type: '@prefix/SET_TOKEN'
    payload: string
}

export const SET_USER = 'SET_USER'

export interface SetUserAction {
    type: '@prefix/SET_USER'
    payload: UserType
}

export const LOGOUT = 'LOGOUT'

export interface LogoutAction {
    type: typeof LOGOUT
}

export type UserActionTypes = SetTokenAction | SetUserAction



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

export interface AppState {
    userdata: UserState
    accountdata: AccountState
}
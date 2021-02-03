import { UserType } from '../types'

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

export interface AppState {
    userdata: UserState
}
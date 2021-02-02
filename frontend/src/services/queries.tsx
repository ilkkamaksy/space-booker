import axios from 'axios'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { RegisterUserInput, UserType, AuthToken, LoginUserInput } from '../types'

const APIURL = 'http://localhost:3000/api/v1'

export function register(user: RegisterUserInput):Promise<UserType> {
	return axios.post(`${APIURL}/register`, user)
}

export function login(user: LoginUserInput):Promise<UseMutationResult<AuthToken, Error>> {
	return axios.post('http://localhost:3000/auth', user)
}

export function me(token:string|undefined):Promise<UseQueryResult<UserType, Error>> {
	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}
	return axios.get(`${APIURL}/me`, config)
}
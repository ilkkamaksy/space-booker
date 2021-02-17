import axios from 'axios'
import { UseMutationResult, UseQueryResult } from 'react-query'
import { 
	RegisterUserInput, 
	UserType, 
	AuthToken, 
	LoginUserInput,
	AccountInput,
	Account,
	Service,
	ServiceInput,
	Booking
} from '../types'
import { API_URL, API_PREFIX } from '../utils/config'

export function register(user: RegisterUserInput):Promise<UseMutationResult<AuthToken, Error>> {
	return axios.post(`${API_URL}/${API_PREFIX}/register`, user)
}

export function login(user: LoginUserInput):Promise<UseMutationResult<AuthToken, Error>> {
	return axios.post(`${API_URL}/auth`, user)
}

export function saveAccount(account:AccountInput):Promise<UseMutationResult<Account, Error>> {
	
	const token = localStorage.getItem('access_token')

	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}
	return axios.post(`${API_URL}/${API_PREFIX}/accounts`, account, config)
}

export function updateAccount(account:Account):Promise<UseMutationResult<Account, Error>> {
	
	const token = localStorage.getItem('access_token')

	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}

	return axios.put(`${API_URL}/${API_PREFIX}/accounts/${account.id}`, account, config)
}

export function getAccounts():Promise<UseQueryResult<Account[], Error>> {
	
	const token = localStorage.getItem('access_token')

	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}
	return axios.get(`${API_URL}/${API_PREFIX}/accounts`, config)
}

export function getAccountById(id:string|undefined):Promise<UseQueryResult<Account, Error>> {
	
	const token = localStorage.getItem('access_token')

	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}
	return axios.get(`${API_URL}/${API_PREFIX}/accounts/${id}`, config)
}


export function saveService(service:ServiceInput):Promise<UseMutationResult<Service, Error>> {
	
	const token = localStorage.getItem('access_token')

	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}
	return axios.post(`${API_URL}/${API_PREFIX}/services`, service, config)
}

export function updateService(service:Service):Promise<UseMutationResult<Service, Error>> {
	
	const token = localStorage.getItem('access_token')

	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}

	return axios.put(`${API_URL}/${API_PREFIX}/services/${service.id}`, service, config)
}

export function getServices(account:Account|undefined):Promise<UseQueryResult<Service[], Error>> {
	
	const token = localStorage.getItem('access_token')

	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}

	const accountId = account ? account.id : -1
	
	return axios.get(`${API_URL}/${API_PREFIX}/services/account/${accountId}`, config)
}

export function saveBooking(booking:Booking):Promise<UseMutationResult<Booking, Error>> {
	
	const token = localStorage.getItem('access_token')

	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}
	return axios.post(`${API_URL}/${API_PREFIX}/bookings`, booking, config)
}

export function getBookingsByAccountId(accountId:string|undefined):Promise<UseQueryResult<Booking[], Error>> {
	
	const token = localStorage.getItem('access_token')

	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}

	return axios.get(`${API_URL}/${API_PREFIX}/bookings/account/${accountId}`, config)
}

export function getBookingsByAccountIdAndDateStr({ accountId, date}: { accountId: string|undefined, date: string}):Promise<UseQueryResult<Booking[], Error>> {
	
	const token = localStorage.getItem('access_token')

	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}

	return axios.get(`${API_URL}/${API_PREFIX}/bookings/account/${accountId}?date=${date}`, config)
}

export function me(token:string|undefined):Promise<UseQueryResult<UserType, Error>> {
	const config = {
		headers: {
			'Authorization': `JWT ${token}`
		}
	}
	return axios.get(`${API_URL}/${API_PREFIX}/me`, config)
}
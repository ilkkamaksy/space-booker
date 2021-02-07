import { UserType } from '../../types'
import { 
	UserActionTypes,
} from '../types'
import '../reducers/user'

export function setToken(token:string):UserActionTypes {
	return {
		type: '@prefix/SET_TOKEN',
		payload: token
	}
}

export const setUser = (user:UserType):UserActionTypes =>  {
	return {
		type: '@prefix/SET_USER',
		payload: user
	}
}

export const logoutUser = ():UserActionTypes =>  {
	return {
		type: '@prefix/LOGOUT_USER',
	}
}


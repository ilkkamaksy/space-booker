import { Account } from '../../types'
import { 
	AccountActionTypes,
} from '../types'
import '../reducers/account'

export function addAccount(account:Account):AccountActionTypes {
	return {
		type: '@prefix/ADD_ACCOUNT',
		payload: account
	}
}

export const setAccounts = (accounts:Account[]):AccountActionTypes =>  {
	return {
		type: '@prefix/SET_ACCOUNTS',
		payload: accounts
	}
}



import { Account } from '../../types'
import { 
	AccountActionTypes,
} from '../types'
import '../reducers/account'

export function startAction():AccountActionTypes {
	return {
		type: '@prefix/START_ACTION'
	}
}

export function doneAction():AccountActionTypes {
	return {
		type: '@prefix/DONE_ACTION'
	}
}

export function addAccount(account:Account):AccountActionTypes {
	return {
		type: '@prefix/ADD_ACCOUNT',
		payload: account
	}
}

export function removeAccount(account:Account):AccountActionTypes {
	return {
		type: '@prefix/REMOVE_ACCOUNT',
		payload: account
	}
}

export const setAccounts = (accounts:Account[]):AccountActionTypes =>  {
	return {
		type: '@prefix/SET_ACCOUNTS',
		payload: accounts
	}
}

export function setSingleAccount(account:Account):AccountActionTypes {
	return {
		type: '@prefix/SET_SINGLE_ACCOUNT',
		payload: account
	}
}



import { 
	AccountActionTypes, 
	AccountState, 
} from '../types'
import { Account } from '../../types'

const initialState = {
	accounts: [],
	updatingAccounts: true,
}

const accountReducer = (state = initialState, action: AccountActionTypes):AccountState => {
	switch (action.type) {
	case '@prefix/START_ACCOUNT_ACTION':
		return {
			...state,
			updatingAccounts: true
		}
	case '@prefix/DONE_ACCOUNT_ACTION':
		return {
			...state,
			updatingAccounts: false
		}
	case '@prefix/ADD_ACCOUNT':
		return {
			...state,
			accounts: [action.payload, ...state.accounts],
			updatingAccounts: false
		}
	case '@prefix/REMOVE_ACCOUNT':
		return {
			...state,
			accounts: state.accounts.filter((account:Account) => account.id !== action.payload.id),
			updatingAccounts: false
		}
	case '@prefix/SET_ACCOUNTS':
		return {
			...state,
			accounts: action.payload,
			updatingAccounts: false
		}
	case '@prefix/SET_SINGLE_ACCOUNT':
		return {
			...state,
			accounts: state.accounts.map((acc:Account) => acc.id === action.payload.id ? action.payload : acc),
			updatingAccounts: false
		}
	default: 
		return state
	}
}

export default accountReducer
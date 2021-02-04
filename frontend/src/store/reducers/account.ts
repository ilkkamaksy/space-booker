import { 
	AccountActionTypes, 
	AccountState, 
} from '../types'
import { Account } from '../../types'

const initialState = {
	accounts: [],
	updating: false
}

const accountReducer = (state = initialState, action: AccountActionTypes):AccountState => {
	switch (action.type) {
	case '@prefix/START_ACTION':
		return {
			...state,
			updating: true
		}
	case '@prefix/DONE_ACTION':
		return {
			...state,
			updating: false
		}
	case '@prefix/ADD_ACCOUNT':
		return {
			...state,
			accounts: [action.payload, ...state.accounts],
			updating: false
		}
	case '@prefix/SET_ACCOUNTS':
		return {
			...state,
			accounts: action.payload,
		}
	case '@prefix/SET_SINGLE_ACCOUNT':
		return {
			...state,
			accounts: state.accounts.map((acc:Account) => acc.id === action.payload.id ? action.payload : acc),
			updating: false
		}
	default: 
		return state
	}
}

export default accountReducer
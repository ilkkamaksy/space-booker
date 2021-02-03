import { 
	AccountActionTypes, 
	AccountState, 
} from '../types'

const initialState = {
	accounts: [],
}

const accountReducer = (state = initialState, action: AccountActionTypes):AccountState => {

	switch (action.type) {
	case '@prefix/ADD_ACCOUNT':
		return {
			...state,
			accounts: [action.payload, ...state.accounts],
		}
	case '@prefix/SET_ACCOUNTS':
		return {
			...state,
			accounts: action.payload,
		}
	default: 
		return state
	}
}

export default accountReducer
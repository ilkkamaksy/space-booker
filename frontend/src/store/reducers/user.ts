import { 
	UserActionTypes, 
	UserState, 
} from '../types'

const initialState = {
	user: undefined,
	token: undefined,
	loggedOut: false
}

const userReducer = (state = initialState, action: UserActionTypes):UserState => {

	switch (action.type) {
	case '@prefix/SET_TOKEN':
		return {
			...state,
			token: action.payload,
		}
	case '@prefix/SET_USER':
		return {
			...state,
			user: action.payload,
			loggedOut: false,
		}
	case '@prefix/LOGOUT_USER' :
		return {
			...state,
			user: undefined,
			token: undefined,
			loggedOut: true,
		}
	default: return state
	}
}

export default userReducer
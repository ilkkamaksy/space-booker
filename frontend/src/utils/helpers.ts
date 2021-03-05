import { UserType, Account } from '../types'

export const dateString = (date:Date):string => {
	return new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
		.toISOString()
		.split('T')[0]
}

export const isOwner = (user:UserType, account: Account):boolean => {
	const currentUserRole = account.user_roles.find(user_role => user_role.user.username === user?.username)
	if (
		!user || 
		!currentUserRole ||
		currentUserRole.role.role !== 'owner'
	) {
		return false
	}

	return true
}

export const isAdmin = (user:UserType, account: Account):boolean => {
	const currentUserRole = account.user_roles.find(user_role => user_role.user.username === user?.username)
	if (
		!user || 
		!currentUserRole ||
		currentUserRole.role.role !== 'admin'
	) {
		return false
	}

	return true
}

export const isUser = (user:UserType, account: Account):boolean => {
	const currentUserRole = account.user_roles.find(user_role => user_role.user.username === user?.username)
	if (
		!user || 
		!currentUserRole ||
		currentUserRole.role.role !== 'user'
	) {
		return false
	}

	return true
}

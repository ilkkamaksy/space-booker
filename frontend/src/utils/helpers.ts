import { UserType, Account } from '../types'

export const dateString = (date:Date):string => {
	return new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
		.toISOString()
		.split('T')[0]
}

export const isOwner = (user:UserType|undefined, account: Account):boolean => {
	if (!user) {
		return false
	}
	const currentUserRole = account.user_roles.find(user_role => user_role.user.username === user?.username)
	if (
		!currentUserRole ||
		currentUserRole.role.role !== 'owner'
	) {
		return false
	}

	return true
}

export const isAdmin = (user:UserType|undefined, account: Account):boolean => {
	if (!user) {
		return false
	}
	const currentUserRole = account.user_roles.find(user_role => user_role.user.username === user?.username)
	if (
		!currentUserRole ||
		currentUserRole.role.role !== 'admin'
	) {
		return false
	}

	return true
}

export const isUser = (user:UserType|undefined, account: Account):boolean => {
	if (!user) {
		return false
	}
	const currentUserRole = account.user_roles.find(user_role => user_role.user.username === user?.username)
	if (
		!currentUserRole ||
		currentUserRole.role.role !== 'user'
	) {
		return false
	}

	return true
}

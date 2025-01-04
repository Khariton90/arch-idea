import { UserStatus } from '@/entities/user'

export type SessionDto = {
	accessToken: string
}

export type QrCodeDto = {
	sub: string
	modelName: string
}

export type AuthRdo = {
	userId: string
	access_token: string
	refresh_token: string
}

export type UserDto = {
	id: string
	firstName: string
	lastName: string
	status: UserStatus
	department: string
	favoriteIdeasCount: number
	myIdeasCount: number
}

export type UserRdo = {
	id: string
	status: string
	firstName: string
	lastName: string
}

export enum AuthorizationStatus {
	Auth = 'AUTH',
	NoAuth = 'NO_AUTH',
	Unknown = 'UNKNOWN',
}

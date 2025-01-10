import { UserRole, UserStatus } from '@/entities/user'

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
	role: UserRole
	login: string
}

export interface UserListDto extends UserDto {
	role: UserRole
}

export type UserRdo = {
	id: string
	status: string
	firstName: string
	lastName: string
}

export type UserOptionsDto = {
	id: string
	role?: UserRole
	status?: UserStatus
}

export enum AuthorizationStatus {
	Auth = 'AUTH',
	NoAuth = 'NO_AUTH',
	Unknown = 'UNKNOWN',
}

export type SignInForm = {
	login: string
	password: string
	modelName?: string
}

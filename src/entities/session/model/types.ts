export type SessionDto = {
	accessToken: string
}

export type QrCodeDto = {
	sub: string
}

export type AuthRdo = {
	access_token: string
	refresh_token: string
}

export type UserDto = {
	id: string
	firstName: string
	lastName: string
	status: string
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

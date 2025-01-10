export interface UpdateUserDto {
	firstName: string
	lastName: string
	login: string
	password: string
}

export enum UserStatus {
	NotVerified = 'NotVerified',
	Spec = 'Spec',
	Master = 'Master',
	Pro = 'Pro',
	Expert = 'Expert',
	SuperExpert = 'SuperExpert',
}

export enum UserRole {
	Admin = 'Admin',
	Manager = 'Manager',
	User = 'User',
}

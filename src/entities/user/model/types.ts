export interface UpdateUserDto {
	firstName: string
	lastName: string
	email: string
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

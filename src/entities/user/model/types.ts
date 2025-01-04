export interface UpdateUserDto {
	firstName: string
	lastName: string
}

export enum UserStatus {
	NotVerified = 'NotVerified',
	Spec = 'Spec',
	Master = 'Master',
	Pro = 'Pro',
	Expert = 'Expert',
	SuperExpert = 'SuperExpert',
}

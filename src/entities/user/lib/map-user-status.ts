import { UserRole, UserStatus } from '../model/types'

export const mappingUserStatus: Record<UserStatus, string> = {
	[UserStatus.NotVerified]: 'Не верифицирован',
	[UserStatus.Spec]: 'Спец',
	[UserStatus.Master]: 'Мастер',
	[UserStatus.Pro]: 'Профи',
	[UserStatus.Expert]: 'Эксперт',
	[UserStatus.SuperExpert]: 'Супер-эксперт',
}

export const mappingUserRole: Record<UserRole, string> = {
	[UserRole.Admin]: 'Супер-пользователь',
	[UserRole.User]: 'Пользователь',
	[UserRole.Manager]: 'Администратор',
}

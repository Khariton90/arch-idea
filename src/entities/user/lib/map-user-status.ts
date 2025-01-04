import { UserStatus } from '../model/types'

export const mappingUserStatus: Record<UserStatus, string> = {
	[UserStatus.NotVerified]: 'Не верифицирован',
	[UserStatus.Spec]: 'Спец',
	[UserStatus.Master]: 'Мастер',
	[UserStatus.Pro]: 'Профи',
	[UserStatus.Expert]: 'Эксперт',
	[UserStatus.SuperExpert]: 'Супер-эксперт',
}

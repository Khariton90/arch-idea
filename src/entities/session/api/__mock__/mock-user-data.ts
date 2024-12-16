import { SessionDto } from '../../model/types'

export const getMockUserData = (): SessionDto => {
	return {
		accessToken: '123',
		id: '1',
	}
}

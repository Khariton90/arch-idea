import { baseApi } from '@/shared/api/base-api'
import { AuthRdo, UserDto, type QrCodeDto } from '../model/types'
import { selectToken } from '../model/slice'

export const sessionApi = baseApi.injectEndpoints({
	endpoints: build => ({
		authByQrCode: build.mutation<AuthRdo, QrCodeDto>({
			query: dto => ({
				url: '/auth/register',
				method: 'POST',
				body: dto,
				params: { delay: 2000 },
			}),
		}),
		account: build.query<UserDto, void>({
			query: () => ({
				url: '/user/account',
				method: 'GET',
			}),
		}),
	}),
})

export const { useAuthByQrCodeMutation, useAccountQuery } = sessionApi

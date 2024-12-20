import { baseApi } from '@/shared/api/base-api'
import { AuthRdo, UserDto, type QrCodeDto } from '../model/types'
import { SESSION_TAG } from '@/shared/api/tags'

export const sessionApi = baseApi.injectEndpoints({
	endpoints: build => ({
		authByQrCode: build.mutation<AuthRdo, QrCodeDto>({
			query: dto => ({
				url: '/auth/register',
				method: 'POST',
				body: dto,
			}),
			invalidatesTags: [SESSION_TAG],
		}),
		account: build.query<UserDto, void>({
			query: () => ({
				url: '/user/account',
				method: 'GET',
			}),
			providesTags: [SESSION_TAG],
		}),
	}),
})

export const { useAuthByQrCodeMutation, useAccountQuery } = sessionApi

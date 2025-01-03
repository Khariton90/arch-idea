import { baseApi } from '@/shared/api/base-api'
import { AuthRdo, UserDto, type QrCodeDto } from '../model/types'
import { SESSION_TAG } from '@/shared/api/tags'

export const sessionApi = baseApi.injectEndpoints({
	endpoints: build => ({
		authByQrCode: build.mutation<AuthRdo, QrCodeDto>({
			query: dto => ({
				url: '/auth/register',
				method: 'POST',
				body: { ...dto },
			}),
			invalidatesTags: [SESSION_TAG],
		}),
		getAccount: build.query<UserDto, void>({
			query() {
				return {
					url: '/user/account',
					method: 'GET',
				}
			},
			providesTags: [SESSION_TAG],
		}),
		sendRefreshToken: build.mutation({
			query: (token: string) => ({
				url: '/auth/refresh',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
})

export const {
	useAuthByQrCodeMutation,
	useGetAccountQuery,
	useSendRefreshTokenMutation,
} = sessionApi

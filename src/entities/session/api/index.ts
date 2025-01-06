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
		sendRefreshToken: build.mutation<AuthRdo, string>({
			query: (token: string) => ({
				url: '/auth/refresh',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
		signOut: build.mutation({
			query: () => ({
				url: '/auth/signOut',
				method: 'POST',
			}),
		}),
	}),
})

export const {
	useAuthByQrCodeMutation,
	useGetAccountQuery,
	useSendRefreshTokenMutation,
	useSignOutMutation,
} = sessionApi

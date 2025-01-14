import { baseApi } from '@/shared/api/base-api'
import { UpdateUserDto, UserQuery } from '../model/types'
import {
	UserDto,
	UserListDto,
	UserOptionsDto,
} from '@/entities/session/model/types'
import { USER_TAG } from '@/shared/api/tags'

export const userApi = baseApi.injectEndpoints({
	endpoints: build => ({
		findTotalCount: build.query<number, void>({
			query: () => ({
				url: '/user/totalCount',
			}),
		}),

		fetchUsers: build.query<UserListDto, UserQuery>({
			query: params => ({
				url: '/user/all',
				params: { ...params },
			}),
			providesTags: [USER_TAG],
		}),
		updateUser: build.mutation<UserDto, UpdateUserDto>({
			query: dto => ({
				url: '/user/update',
				method: 'POST',
				body: dto,
			}),
		}),
		updateUserOptions: build.mutation<UserDto, UserOptionsDto>({
			query: ({ id, ...body }) => ({
				url: `/user/update-options/${id}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: [USER_TAG],
		}),
	}),
})

export const {
	useUpdateUserMutation,
	useFetchUsersQuery,
	useUpdateUserOptionsMutation,
	useFindTotalCountQuery,
} = userApi

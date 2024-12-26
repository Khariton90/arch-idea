import { baseApi } from '@/shared/api/base-api'
import { UpdateUserDto } from '../model/types'
import { UserRdo } from '@/entities/session/model/types'

export const userApi = baseApi.injectEndpoints({
	endpoints: build => ({
		updateUser: build.mutation<UserRdo, UpdateUserDto>({
			query: dto => ({
				url: '/user/update',
				method: 'POST',
				body: dto,
			}),
		}),
	}),
})

export const { useUpdateUserMutation } = userApi

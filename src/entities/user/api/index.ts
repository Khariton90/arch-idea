import { baseApi } from '@/shared/api/base-api'
import { UpdateUserDto } from '../model/types'
import { UserDto } from '@/entities/session/model/types'

export const userApi = baseApi.injectEndpoints({
	endpoints: build => ({
		updateUser: build.mutation<UserDto, UpdateUserDto>({
			query: dto => ({
				url: '/user/update',
				method: 'POST',
				body: dto,
			}),
		}),
	}),
})

export const { useUpdateUserMutation } = userApi

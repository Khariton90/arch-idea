import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiTags } from './api-tags.enum'
import { selectToken } from '@/entities/session/model/slice'
import { RootState } from '@/app/store'
import { BASE_URL } from '@/shared/constants/consts'

export const baseApi = createApi({
	tagTypes: [ApiTags.SessionTag],
	reducerPath: 'baseApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = selectToken(getState() as RootState)

			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}

			return headers
		},
	}),
	endpoints: () => ({}),
})

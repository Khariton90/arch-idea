import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectToken } from '@/entities/session/model/slice'
import { RootState } from '@/app/store'
import { BASE_URL } from '@/shared/constants/consts'
import {
	COMMENT_TAG,
	IDEA_TAG,
	SESSION_TAG,
	VOTE_TAG,
	WISHLIST_TAG,
} from './tags'

export const baseApi = createApi({
	tagTypes: [SESSION_TAG, IDEA_TAG, WISHLIST_TAG, COMMENT_TAG, VOTE_TAG],
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

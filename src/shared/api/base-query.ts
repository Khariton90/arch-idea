import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectToken } from '@/entities/session/model/slice'
import { RootState } from '@/app/store'

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL

import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'

export const baseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	{},
	FetchBaseQueryMeta
> = fetchBaseQuery({
	baseUrl: BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = selectToken(getState() as RootState)

		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}

		return headers
	},
})

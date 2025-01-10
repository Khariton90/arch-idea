import { createApi } from '@reduxjs/toolkit/query/react'

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL

import {
	COMMENT_TAG,
	IDEA_TAG,
	ONE_IDEA,
	SESSION_TAG,
	USER_TAG,
	VOTE_TAG,
	WISHLIST_TAG,
} from './tags'

import { baseQueryWithReauth } from './base-query-with-reauth'

export const baseApi = createApi({
	tagTypes: [
		SESSION_TAG,
		IDEA_TAG,
		WISHLIST_TAG,
		COMMENT_TAG,
		VOTE_TAG,
		USER_TAG,
		ONE_IDEA,
	],
	reducerPath: 'baseApi',
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
})

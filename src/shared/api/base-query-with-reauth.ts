import {
	BaseQueryApi,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	QueryReturnValue,
} from '@reduxjs/toolkit/query'
import { baseQuery } from './base-query'
import { getToken } from '@/entities/session/api/session-api'
import { invalidateAccessToken } from './invalidate-token-event'
import { refreshThunk } from '@/features/authentication/login/model/login'

const AUTH_ERROR_CODES = new Set([401])

export async function baseQueryWithReauth(
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: {}
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
	const result = await baseQuery(args, api, extraOptions)
	const token = await getToken()

	if (token) {
		api.dispatch(refreshThunk(token))
	}

	if (
		typeof result.error?.status === 'number' &&
		AUTH_ERROR_CODES.has(result.error.status)
	) {
		api.dispatch(invalidateAccessToken())
	}
	return result
}

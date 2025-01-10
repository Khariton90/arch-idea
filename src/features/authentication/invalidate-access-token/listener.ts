import { RootState } from '@/app/store'
import { invalidateAccessToken } from '@/shared/api/invalidate-token-event'
import { AppDispatch } from '@/shared/hooks/hooks'
import {
	createListenerMiddleware,
	type TypedStartListening,
} from '@reduxjs/toolkit'
import { logoutThunk } from '../logout/logout'

export const invalidateAccessTokenListener = createListenerMiddleware()

export type TypedListening = TypedStartListening<RootState, AppDispatch>

export const startInvalidateAccessTokenListener =
	invalidateAccessTokenListener.startListening as TypedListening

startInvalidateAccessTokenListener({
	actionCreator: invalidateAccessToken,
	effect: async (_, api) => {
		api.dispatch(logoutThunk())
	},
})

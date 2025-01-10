import { ideaApi } from '@/entities/idea/api/index'
import { RootState } from '@/app/store'
import { sessionApi } from '@/entities/session/api'
import { resetToken } from '@/entities/session/api/session-api'
import { clearSessionData } from '@/entities/session/model/slice'
import { wishlistApi } from '@/entities/wishlist/api'
import { IDEA_TAG, SESSION_TAG, WISHLIST_TAG } from '@/shared/api/tags'
import { delay } from '@/shared/lib/delay'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
	'authentication/logout',
	async (_: unknown, { dispatch }) => {
		dispatch(clearSessionData())
		await resetToken()

		await delay(10)

		dispatch(sessionApi.util.invalidateTags([SESSION_TAG]))
		dispatch(wishlistApi.util.invalidateTags([WISHLIST_TAG]))
		dispatch(ideaApi.util.invalidateTags([IDEA_TAG]))
	}
)

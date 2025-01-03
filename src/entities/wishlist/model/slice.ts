import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { wishlistApi } from '../api'
import { sessionApi } from '@/entities/session/api'

interface WishlistState {
	count: number
}

const initialState: WishlistState = {
	count: 0,
}

export const wishlistSlice = createSlice({
	name: 'wishlistSlice',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(
			sessionApi.endpoints.getAccount.matchFulfilled,
			(state, { payload }) => {
				state.count = payload.favoriteIdeasCount
			}
		)
		builder.addMatcher(
			wishlistApi.endpoints.addToWishlist.matchFulfilled,
			state => {
				state.count += 1
			}
		),
			builder.addMatcher(
				wishlistApi.endpoints.removeFromWishlist.matchFulfilled,

				state => {
					state.count -= 1
				}
			)
	},
})

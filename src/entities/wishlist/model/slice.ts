import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { wishlistApi } from '../api'

interface WishlistState {
	count: number
}

const initialState: WishlistState = {
	count: 0,
}

export const wishlistSlice = createSlice({
	name: 'wishlistSlice',
	initialState,
	reducers: {
		setWishlistCount(state, action: PayloadAction<number>) {
			state.count = action.payload
		},
	},
	extraReducers: builder => {
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

export const { setWishlistCount } = wishlistSlice.actions

import { createSlice } from '@reduxjs/toolkit'
import { commentApi } from '../api'

interface State {
	commentCount: number
}

const initialState: State = {
	commentCount: 0,
}

export const commentSlice = createSlice({
	name: 'commentSlice',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addMatcher(
			commentApi.endpoints.findCommentCount.matchFulfilled,
			(state, action) => {
				state.commentCount = action.payload
			}
		)
		builder.addMatcher(
			commentApi.endpoints.createComment.matchFulfilled,
			state => {
				state.commentCount += 1
			}
		)
	},
})

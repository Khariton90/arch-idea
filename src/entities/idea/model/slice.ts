import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ideaApi } from '../api'
import { sessionApi } from '@/entities/session/api'

interface State {
	myIdeasCount: number
	totalCount: number
}

const initialState: State = {
	myIdeasCount: 0,
	totalCount: 0,
}

export const ideaSlice = createSlice({
	name: 'ideaSlice',
	initialState,
	reducers: {
		setMyIdeasCount(state, action: PayloadAction<number>) {
			state.myIdeasCount = action.payload
		},
	},
	extraReducers: builder => {
		builder.addMatcher(ideaApi.endpoints.createIdea.matchFulfilled, state => {
			state.myIdeasCount += 1
		}),
			builder.addMatcher(
				sessionApi.endpoints.getAccount.matchFulfilled,
				(state, { payload }) => {
					state.myIdeasCount = payload.myIdeasCount
				}
			)
		builder.addMatcher(
			ideaApi.endpoints.findIdeas.matchFulfilled,
			(state, { payload }) => {
				state.totalCount = payload.length
			}
		)
	},
})

export const { setMyIdeasCount } = ideaSlice.actions

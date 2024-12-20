import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Idea, IdeaRdo } from './types'
import { ideaApi } from '../api'

interface State {
	myIdeasCount: number
}

const initialState: State = {
	myIdeasCount: 0,
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
		})
	},
})

export const { setMyIdeasCount } = ideaSlice.actions

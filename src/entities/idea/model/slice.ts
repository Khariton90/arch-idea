import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ideaApi } from '../api'
import { sessionApi } from '@/entities/session/api'
import { IdeaQuery, LocationDepartment } from './types'

interface State {
	myIdeasCount: number
	totalCount: number
	currentFilter: IdeaQuery
}

const initialState: State = {
	myIdeasCount: 0,
	totalCount: 0,
	currentFilter: {
		page: 0,
		limit: 10,
	},
}

export const ideaSlice = createSlice({
	name: 'ideaSlice',
	initialState,
	reducers: {
		setMyIdeasCount(state, action: PayloadAction<number>) {
			state.myIdeasCount = action.payload
		},
		setCurrentFilter(state, { payload }: PayloadAction<IdeaQuery>) {
			state.currentFilter = payload
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
					state.currentFilter.department =
						payload.department as LocationDepartment
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

export const { setMyIdeasCount, setCurrentFilter } = ideaSlice.actions

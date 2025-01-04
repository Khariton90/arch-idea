import { sessionApi } from '@/entities/session/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserStatus } from './types'

interface UserState {
	firstName: string
	lastName: string
	status: UserStatus
}

const initialState: UserState = {
	firstName: '',
	lastName: '',
	status: UserStatus.NotVerified,
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUserFullName: (state, action: PayloadAction<UserState>) => {
			state.firstName = action.payload.firstName
			state.lastName = action.payload.lastName
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			sessionApi.endpoints.getAccount.matchFulfilled,
			(state, { payload }) => {
				state.firstName = payload.firstName
				state.lastName = payload.lastName
				state.status = payload.status
			}
		)
	},
})

export const { setUserFullName } = userSlice.actions

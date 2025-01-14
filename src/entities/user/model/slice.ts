import { sessionApi } from '@/entities/session/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserRole, UserStatus } from './types'
import { userApi } from '../api'

interface UserState {
	firstName: string
	lastName: string
	status: UserStatus
	role: UserRole
	login: string
	totalCount: number
}

const initialState: UserState = {
	firstName: '',
	lastName: '',
	role: UserRole.Admin,
	status: UserStatus.NotVerified,
	login: '',
	totalCount: 0,
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
				state.role = payload.role
				state.firstName = payload.firstName
				state.lastName = payload.lastName
				state.status = payload.status
				state.login = payload.login
			}
		),
			builder.addMatcher(
				userApi.endpoints.updateUser.matchFulfilled,
				(state, { payload }) => {
					state.firstName = payload.firstName
					state.lastName = payload.lastName
					state.status = payload.status
				}
			),
			builder.addMatcher(
				userApi.endpoints.findTotalCount.matchFulfilled,
				(state, { payload }) => {
					state.totalCount = payload
				}
			)
	},
})

export const { setUserFullName } = userSlice.actions

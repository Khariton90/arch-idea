import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { AuthorizationStatus, AuthRdo } from './types'
import { saveToken } from '../api/session-api'

interface SessionState {
	isAuthorized: AuthorizationStatus
	userId: string | null
	accessToken: string | null
}

const initialState: SessionState = {
	isAuthorized: AuthorizationStatus.Unknown,
	userId: null,
	accessToken: null,
}

export const sessionSlice = createSlice({
	name: 'sessionSlice',
	initialState: initialState,
	reducers: {
		addSessionData: (state, action: PayloadAction<AuthRdo>) => {
			state.isAuthorized = AuthorizationStatus.Auth
			state.accessToken = action.payload.access_token
			state.userId = action.payload.userId
		},
		clearSessionData(state) {
			state.isAuthorized = AuthorizationStatus.NoAuth
			state.accessToken = null
			state.userId = null
		},
	},
})

export const { addSessionData, clearSessionData } = sessionSlice.actions
export const selectToken = (state: RootState) => state.sessionSlice.accessToken

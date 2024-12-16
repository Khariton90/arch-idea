import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SessionDto } from './types'
import { RootState } from '@/app/store'

interface State {
	isAuthorized: boolean
	userId: string
	accessToken: string | null
}

const initialState: State = {
	isAuthorized: false,
	userId: '',
	accessToken: null,
}

export const sessionSlice = createSlice({
	name: 'sessionSlice',
	initialState: initialState,
	reducers: {
		setIsAuthorized: (state, action: PayloadAction<string>) => {
			state.isAuthorized = true
			state.accessToken = action.payload
		},
		setToken(state, action: PayloadAction<string>) {
			state.accessToken = action.payload
		},
		setUserId(state, action: PayloadAction<string>) {
			state.userId = action.payload
		},
	},
})

export const { setIsAuthorized, setToken, setUserId } = sessionSlice.actions
export const selectToken = (state: RootState) => state.sessionSlice.accessToken

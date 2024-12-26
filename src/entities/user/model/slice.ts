import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
	firstName: string
	lastName: string
}

const initialState: UserState = {
	firstName: 'Пользователь',
	lastName: '',
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
})

export const { setUserFullName } = userSlice.actions

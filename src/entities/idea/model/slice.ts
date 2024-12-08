import { createSlice } from '@reduxjs/toolkit'

interface State {
	isLoading: boolean
	count: number
}

const initialState: State = {
	isLoading: false,
	count: 0,
}

export const ideaSlice = createSlice({
	name: 'idea',
	initialState,
	reducers: {},
})

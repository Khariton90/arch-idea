import { ideaSlice } from '@/entities/idea/model/slice'
import { combineReducers } from '@reduxjs/toolkit'

export const reducer = combineReducers({
	[ideaSlice.name]: ideaSlice.reducer,
})

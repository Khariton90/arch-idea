import { ideaSlice } from '@/entities/idea/model/slice'
import { combineReducers } from '@reduxjs/toolkit'

export default combineReducers({
	[ideaSlice.name]: ideaSlice.reducer,
})

import { ideaSlice } from '@/entities/idea/model/slice'
import { sessionSlice } from '@/entities/session/model/slice'
import { baseApi } from '@/shared/api/base-api'
import { combineReducers } from '@reduxjs/toolkit'

export default combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	[ideaSlice.name]: ideaSlice.reducer,
	[sessionSlice.name]: sessionSlice.reducer,
})

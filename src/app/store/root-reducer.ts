import { ideaSlice } from '@/entities/idea/model/slice'
import { sessionSlice } from '@/entities/session/model/slice'
import { userSlice } from '@/entities/user/model/slice'
import { wishlistSlice } from '@/entities/wishlist/model/slice'
import { baseApi } from '@/shared/api/base-api'
import { combineReducers } from '@reduxjs/toolkit'

export default combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	[ideaSlice.name]: ideaSlice.reducer,
	[sessionSlice.name]: sessionSlice.reducer,
	[wishlistSlice.name]: wishlistSlice.reducer,
	[userSlice.name]: userSlice.reducer,
})

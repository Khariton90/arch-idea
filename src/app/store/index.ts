import { configureStore } from '@reduxjs/toolkit'
import reducer from './root-reducer'
import { baseApi } from '@/shared/api/base-api'

export const setupStore = () => {
	return configureStore({
		reducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(baseApi.middleware),
	})
}

export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>

export default setupStore()

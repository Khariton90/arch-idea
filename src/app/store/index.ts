import { invalidateAccessTokenListener } from './../../features/authentication/invalidate-access-token/listener'
import { configureStore } from '@reduxjs/toolkit'
import reducer from './root-reducer'
import { baseApi } from '@/shared/api/base-api'
import { setupListeners } from '@reduxjs/toolkit/query'

export const setupStore = () => {
	const store = configureStore({
		reducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(
				baseApi.middleware,
				invalidateAccessTokenListener.middleware
			),
	})
	setupListeners(store.dispatch)
	return store
}

export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>

export default setupStore()

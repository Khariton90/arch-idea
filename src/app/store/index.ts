import { configureStore } from '@reduxjs/toolkit'
import reducer from './root-reducer'

export const setupStore = () => {
	return configureStore({
		reducer,
	})
}

export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>

export default setupStore()

import Navigation from './navigation/navigation'
import { Provider } from 'react-redux'
import store from './store'
import { getAccessToken } from '@/entities/session/api/session-api'
import { setIsAuthorized, setToken } from '@/entities/session/model/slice'
import { delay } from '@/shared/lib/delay'
import { useColorScheme } from 'react-native'
import ThemeProvider from './providers/theme-provider'

const getToken = async () => {
	await delay()
	const token = await getAccessToken()

	if (token !== null) {
		store.dispatch(setIsAuthorized(token))
	} else {
		store.dispatch(setToken(''))
	}
}

getToken()

export default function App() {
	const colorScheme = useColorScheme()

	return (
		<ThemeProvider>
			<Provider store={store}>
				<Navigation />
			</Provider>
		</ThemeProvider>
	)
}

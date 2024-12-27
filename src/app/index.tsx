import Navigation from './navigation/navigation'
import { Provider } from 'react-redux'
import store from './store'
import { getAccessToken } from '@/entities/session/api/session-api'
import { deleteToken, setIsAuthorized } from '@/entities/session/model/slice'
import { delay } from '@/shared/lib/delay'
import ThemeProvider from './providers/theme-provider'
import { BASE_URL } from '@/shared/constants/consts'
import { useEffect } from 'react'

const authenticateAndFetchUser = async () => {
	try {
		const token = await getAccessToken()

		await delay()
		if (token) {
			const response = await fetch(`${BASE_URL}/user/account`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			if (response.ok) {
				store.dispatch(setIsAuthorized(token))
			} else {
				store.dispatch(deleteToken())
			}
		} else {
			store.dispatch(deleteToken())
		}
	} catch (error) {
		store.dispatch(deleteToken())
	}
}

export default function App() {
	useEffect(() => {
		authenticateAndFetchUser()
	})

	return (
		<ThemeProvider>
			<Provider store={store}>
				<Navigation />
			</Provider>
		</ThemeProvider>
	)
}

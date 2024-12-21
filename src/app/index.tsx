import Navigation from './navigation/navigation'
import { Provider } from 'react-redux'
import store from './store'
import { getAccessToken } from '@/entities/session/api/session-api'
import { setIsAuthorized, setToken } from '@/entities/session/model/slice'
import { delay } from '@/shared/lib/delay'

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
	return (
		<Provider store={store}>
			<Navigation />
		</Provider>
	)
}

import Navigation from './navigation/navigation'
import { Provider } from 'react-redux'
import store from './store'
import ThemeProvider from './providers/theme-provider'

export default function App() {
	return (
		<ThemeProvider>
			<Provider store={store}>
				<Navigation />
			</Provider>
		</ThemeProvider>
	)
}

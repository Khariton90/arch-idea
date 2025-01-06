import Navigation from './navigation/navigation'
import { Provider } from 'react-redux'
import store from './store'
import ThemeProvider from './providers/theme-provider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
	return (
		<ThemeProvider>
			<Provider store={store}>
				<GestureHandlerRootView>
					<Navigation />
				</GestureHandlerRootView>
			</Provider>
		</ThemeProvider>
	)
}

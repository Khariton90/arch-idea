import Navigation from './navigation/navigation'
import { Provider } from 'react-redux'
import store from './store'
import ThemeProvider from './providers/theme-provider'
import * as Updates from 'expo-updates'
import { useEffect, useState } from 'react'
import { LoadingIndicator, Typography } from '@/shared/ui'
import { ActivityIndicator, View } from 'react-native'

export default function App() {
	const [isAvailable, setIsAvailable] = useState<null | boolean>(null)

	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync()
			if (update.isAvailable) {
				setIsAvailable(() => true)
				await Updates.fetchUpdateAsync()
				await Updates.reloadAsync()
			} else {
				setIsAvailable(() => false)
			}
		} catch (error) {
			alert(`Error fetching latest Expo update: ${error}`)
			setIsAvailable(() => false)
		}
	}

	useEffect(() => {
		onFetchUpdateAsync()
	}, [])

	if (isAvailable === null) {
		return <LoadingIndicator />
	}

	if (isAvailable) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Typography text={'Идет обновление приложения'} variant={'h1'} />
				<ActivityIndicator />
			</View>
		)
	}
	return (
		<ThemeProvider>
			<Provider store={store}>
				<Navigation />
			</Provider>
		</ThemeProvider>
	)
}

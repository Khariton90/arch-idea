import { HomePage } from '@/pages/home-page/home-page'
import { IdeaDetailsPage } from '@/pages/idea-details-page/idea-details-page'
import { NewIdeaPage } from '@/pages/new-idea-page/new-idea-page'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ReactNode } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Colors } from '../styles/variables'

const Stack = createNativeStackNavigator()

const styles = {
	headerStyle: {
		backgroundColor: Colors.background,
	},
	headerTitleStyle: {
		color: Colors.white,
	},
}
export function Navigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Home'
				component={HomePage}
				options={{
					title: 'Главная',
					...styles,
				}}
			/>
			<Stack.Screen
				name='Details'
				component={IdeaDetailsPage}
				options={{ title: 'Главная', ...styles }}
			/>
			<Stack.Screen
				name='New'
				component={NewIdeaPage}
				options={{ title: 'Новая идея', ...styles }}
			/>
		</Stack.Navigator>
	)
}

import { HomePage } from '@/pages/home-page/home-page'
import { IdeaDetailsPage } from '@/pages/idea-details-page/idea-details-page'
import { NewIdeaPage } from '@/pages/new-idea-page/new-idea-page'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export function Navigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Home'
				component={HomePage}
				options={{ title: 'Главная' }}
			/>
			<Stack.Screen
				name='Details'
				component={IdeaDetailsPage}
				options={{ title: 'Главная' }}
			/>
			<Stack.Screen
				name='New'
				component={NewIdeaPage}
				options={{ title: 'Новая идея' }}
			/>
		</Stack.Navigator>
	)
}

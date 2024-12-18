import { HomePage } from '@/pages/home-page/home-page'
import { IdeaDetailsPage } from '@/pages/idea-details-page/idea-details-page'
import { NewIdeaPage } from '@/pages/new-idea-page/new-idea-page'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Colors from '../styles/Colors'
import { LoginPage } from '@/pages/login-page/login-page'

const Stack = createNativeStackNavigator()

const styles = {
	headerStyle: {
		backgroundColor: Colors.lightGrey,
	},
	headerTitleStyle: {
		color: Colors.white,
	},
}
export default function Navigation() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Login'
				component={LoginPage}
				options={{
					headerBackVisible: false,
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name='Home'
				component={HomePage}
				options={{ title: 'Главная', ...styles, headerBackVisible: false }}
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

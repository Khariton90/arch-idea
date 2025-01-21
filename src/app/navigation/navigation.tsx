import * as Screens from '@/pages'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppRoutes, RootStackParamList } from '@/shared/model'
import { darkTheme, ThemeContext } from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks'
import { AuthorizationStatus } from '@/entities/session'
import React, { memo, useContext, useEffect } from 'react'
import { LoadingIndicator } from '@/shared/ui'
import { UserRole } from '@/entities/user'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFirstAuthorization } from '@/features/authentication'

const Stack = createNativeStackNavigator<RootStackParamList>()

function NavigationComponent() {
	const { theme } = useContext(ThemeContext)
	const authStatus = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized
	)
	const isAdmin = useAppSelector(
		({ userSlice }) => userSlice.role !== UserRole.User
	)
	const { getTokenByAuth, isLoading } = useFirstAuthorization()

	useEffect(() => {
		getTokenByAuth()
	}, [])

	if (authStatus === AuthorizationStatus.Unknown || isLoading) {
		return <LoadingIndicator />
	}

	return (
		<GestureHandlerRootView>
			<SafeAreaProvider style={{ backgroundColor: theme.colors.background }}>
				<Stack.Navigator
					screenOptions={{
						animation: 'fade_from_bottom',
						headerStyle: {
							backgroundColor: theme.colors.background,
						},
						headerTitleStyle: {
							color: darkTheme.colors.primary,
						},
						headerTintColor: theme.colors.border,
					}}
				>
					{authStatus === AuthorizationStatus.NoAuth ? (
						<Stack.Screen
							name={AppRoutes.LoginPage}
							component={Screens.LoginPage}
							options={{
								headerBackVisible: false,
								headerShown: false,
							}}
						/>
					) : (
						<>
							<Stack.Screen
								name={AppRoutes.HomePage}
								component={Screens.HomePage}
								options={{
									title: 'Главная',
									headerBackVisible: false,
								}}
							/>
							{isAdmin && (
								<Stack.Screen
									name={AppRoutes.DashboardPage}
									component={Screens.DashboardPage}
									options={{
										title: 'Участники',
									}}
								/>
							)}
							<Stack.Screen
								name={AppRoutes.IdeaDetailsPage}
								component={Screens.IdeaDetailsPage}
								options={{ title: 'Главная' }}
							/>
							<Stack.Screen
								name={AppRoutes.NewIdeaPage}
								component={Screens.NewIdeaPage}
								options={{ title: 'Новая идея' }}
							/>
							<Stack.Screen
								name={AppRoutes.ProfilePage}
								component={Screens.ProfilePage}
								options={{ title: 'Профиль' }}
							/>
							<Stack.Screen
								name={AppRoutes.CommentsPage}
								component={Screens.CommentsPage}
								options={{
									title: 'Комментарии',
									headerBackTitle: 'Назад',
								}}
							/>
							<Stack.Screen
								name={AppRoutes.ProfileIdeasPage}
								component={Screens.ProfileIdeasPage}
								options={{
									title: 'Идеи',
								}}
							/>
						</>
					)}
				</Stack.Navigator>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	)
}

export default memo(NavigationComponent)

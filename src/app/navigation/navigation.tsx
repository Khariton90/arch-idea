import { HomePage } from '@/pages/home-page/home-page'
import { IdeaDetailsPage } from '@/pages/idea-details-page/idea-details-page'
import { NewIdeaPage } from '@/pages/new-idea-page/new-idea-page'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginPage } from '@/pages/login-page/login-page'
import { ProfilePage } from '@/pages/profile-page/profile-page'
import { CommentsPage } from '@/pages/comments-page/comments-page'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { ProfileIdeasPage } from '@/pages/profile-ideas-page/profile-ideas-page'
import { darkTheme, ThemeContext } from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks/hooks'
import { AuthorizationStatus } from '@/entities/session/model/types'
import React, { memo, useContext, useEffect, useState } from 'react'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { StatusBar } from 'react-native'
import { UserRole } from '@/entities/user'
import { DashboardPage } from '@/pages/dashboard-page/dashboard-page'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFirstAuthorization } from '@/features/authentication'

const Stack = createNativeStackNavigator<RootStackParamList>()

function NavigationComponent() {
	const { theme } = useContext(ThemeContext)

	const styles = {
		headerStyle: {
			backgroundColor: theme.colors.background,
		},
		headerTitleStyle: {
			color: darkTheme.colors.primary,
		},

		headerTintColor: '#6e6e6e',
	}

	const authStatus = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized
	)
	const role = useAppSelector(({ userSlice }) => userSlice.role)
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
				<StatusBar backgroundColor={theme.colors.backdrop} />
				<Stack.Navigator
					screenOptions={{
						animation: 'fade_from_bottom',
					}}
				>
					{authStatus === AuthorizationStatus.NoAuth ? (
						<Stack.Screen
							name={AppRoutes.LoginPage}
							component={LoginPage}
							options={{
								headerBackVisible: false,
								headerShown: false,
							}}
						/>
					) : (
						<>
							<Stack.Screen
								name={AppRoutes.HomePage}
								component={HomePage}
								options={{
									title: 'Главная',
									...styles,
									headerBackVisible: false,
								}}
							/>
							{role !== UserRole.User && (
								<Stack.Screen
									name={AppRoutes.DashboardPage}
									component={DashboardPage}
									options={{
										title: 'Участники',
										...styles,
									}}
								/>
							)}
							<Stack.Screen
								name={AppRoutes.IdeaDetailsPage}
								component={IdeaDetailsPage}
								options={{ title: 'Главная', ...styles }}
							/>
							<Stack.Screen
								name={AppRoutes.NewIdeaPage}
								component={NewIdeaPage}
								options={{ title: 'Новая идея', ...styles }}
							/>
							<Stack.Screen
								name={AppRoutes.ProfilePage}
								component={ProfilePage}
								options={{ title: 'Профиль', ...styles }}
							/>
							<Stack.Screen
								name={AppRoutes.CommentsPage}
								component={CommentsPage}
								options={{
									title: 'Комментарии',
									...styles,
									headerBackTitle: 'Назад',
								}}
							/>
							<Stack.Screen
								name={AppRoutes.ProfileIdeasPage}
								component={ProfileIdeasPage}
								options={{
									title: 'Идеи',
									...styles,
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

/* eslint-disable */
import { HomePage } from '@/pages/home-page/home-page'
import { IdeaDetailsPage } from '@/pages/idea-details-page/idea-details-page'
import { NewIdeaPage } from '@/pages/new-idea-page/new-idea-page'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginPage } from '@/pages/login-page/login-page'
import { ProfilePage } from '@/pages/profile-page/profile-page'
import { CommentsPage } from '@/pages/comments-page/comments-page'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { ProfileIdeasPage } from '@/pages/profile-ideas-page/profile-ideas-page'
import { darkTheme } from '@/shared/colors.styled'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks'
import { AuthorizationStatus } from '@/entities/session/model/types'
import React, { useEffect, useState } from 'react'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { getToken, saveToken } from '@/entities/session/api/session-api'
import { useSendRefreshTokenMutation } from '@/entities/session/api'
import {
	addSessionData,
	clearSessionData,
} from '@/entities/session/model/slice'
import { delay } from '@/shared/lib/delay'

const Stack = createNativeStackNavigator<RootStackParamList>()

const styles = {
	headerStyle: {
		backgroundColor: darkTheme.colors.backdrop,
	},
	headerTitleStyle: {
		color: darkTheme.colors.primary,
	},
	headerBackTitleVisible: false,
	headerTintColor: '#6e6e6e',
}
export default function Navigation() {
	const [isLoading, setIsLoading] = useState(false)
	const authStatus = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized
	)
	const dispatch = useAppDispatch()
	const [sendRefreshToken] = useSendRefreshTokenMutation()

	const getTokenByAuth = async () => {
		setIsLoading(() => true)
		const token = await getToken()

		if (token) {
			await sendRefreshToken(token)
				.then(response => {
					dispatch(addSessionData(response.data))
					saveToken(response.data)
				})
				.catch(() => {
					dispatch(clearSessionData())
				})
		} else {
			dispatch(clearSessionData())
		}

		await delay()
		setIsLoading(() => false)
	}

	useEffect(() => {
		getTokenByAuth()
	}, [])

	if (authStatus === AuthorizationStatus.Unknown || isLoading) {
		return <LoadingIndicator />
	}

	return (
		<Stack.Navigator>
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
						options={{ title: 'Идеи', ...styles }}
					/>
				</>
			)}
		</Stack.Navigator>
	)
}

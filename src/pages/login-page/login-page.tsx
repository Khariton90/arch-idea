import { QrCode } from '@/entities/session/ui/qr-code'
import { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'
import { LayoutLogo } from '@/widgets'
import Root from '@/app/styles/Root'
import { delay } from '@/shared/lib/delay'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { useAppSelector } from '@/shared/hooks/hooks'

import {
	ITheme,
	ThemeContext,
	ViewWithThemeProps,
} from '@/shared/colors.styled'
import { AppRoutes } from '@/shared/model/types'

const Container = styled.View<ViewWithThemeProps>`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
	align-items: center;
	justify-content: center;
	gap: 20px;
`

const Button = styled.TouchableOpacity<
	TouchableOpacityProps & { theme: ITheme }
>`
	background-color: ${({ theme }) => theme.colors.primary};
	padding: 10px 40px;
	align-items: center;
	justify-content: center;
	border-radius: ${Root.radius10};
`

export function LoginPage({ navigation }: any): JSX.Element {
	const { theme, toggleTheme } = useContext(ThemeContext)
	const [isOpenCamera, setIsOpenCamera] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const token = useAppSelector(({ sessionSlice }) => sessionSlice.accessToken)

	const openCamera = async () => {
		await delay()
		setIsLoading(state => false)
		setIsOpenCamera(state => true)
	}

	useEffect(() => {
		if (isLoading) {
			openCamera()
		}
	}, [isLoading])

	if (token === null) {
		return <LoadingIndicator />
	}

	if (!isOpenCamera) {
		return (
			<Container theme={theme}>
				<LayoutLogo />
				{token ? (
					<Button
						theme={theme}
						onPress={() => navigation.replace(AppRoutes.HomePage)}
					>
						<Text>Войти</Text>
					</Button>
				) : (
					<Button theme={theme} onPress={() => setIsLoading(state => true)}>
						<Text>Войти по QR-коду</Text>
					</Button>
				)}
			</Container>
		)
	}

	return <QrCode navigation={navigation} />
}

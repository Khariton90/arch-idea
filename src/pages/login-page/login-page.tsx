import { QrCode } from '@/entities/session/ui/qr-code'
import { useContext, useState } from 'react'
import styled from 'styled-components/native'
import { LayoutLogo } from '@/widgets'
import { delay } from '@/shared/lib/delay'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { useAppSelector } from '@/shared/hooks/hooks'

import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { AppRoutes } from '@/shared/model/types'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'

const Container = styled.View<ViewWithThemeProps>`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
	align-items: center;
	justify-content: center;
	gap: 20px;
`

export function LoginPage({ navigation }: any): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [isOpenCamera, setIsOpenCamera] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { accessToken, isAuthorized } = useAppSelector(
		({ sessionSlice }) => sessionSlice
	)

	const openCamera = async () => {
		setIsLoading(() => true)

		await delay()
		setIsOpenCamera(state => true)
		setIsLoading(() => false)
	}

	if (isLoading) {
		return <LoadingIndicator />
	}

	if (accessToken === null && !isOpenCamera) {
		return <LoadingIndicator />
	}

	if (isAuthorized) {
		return (
			<Container theme={theme}>
				<LayoutLogo />
				<UniversalButton
					onPress={() => navigation.replace(AppRoutes.HomePage)}
					title='Войти'
				/>
			</Container>
		)
	}

	if (!isOpenCamera) {
		return (
			<Container theme={theme}>
				<LayoutLogo />
				<UniversalButton
					onPress={() => openCamera()}
					title='Войти по QR-коду'
				/>
			</Container>
		)
	}

	return <QrCode navigation={navigation} />
}

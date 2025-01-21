import { useContext, useState } from 'react'
import { LayoutLogo } from '@/widgets'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { UniversalButton } from '@/shared/ui'
import { Typography } from '@/shared/ui'
import { SignInLocal, QrCode } from '@/entities/session'
import styled from 'styled-components/native'

const Container = styled.View<ViewWithThemeProps>`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
	align-items: center;
	justify-content: center;
	gap: 20px;
`

const Row = styled.View`
	gap: 10px;
	justify-content: center;
	padding: 0 40px;
	width: 100%;
`

export function LoginPage(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [isOpenCamera, setIsOpenCamera] = useState(false)
	const [isLocalAuth, setIsLocalAuth] = useState(false)

	if (isLocalAuth) {
		return <SignInLocal onChangeScreen={() => setIsLocalAuth(false)} />
	}

	if (!isOpenCamera) {
		return (
			<Container theme={theme}>
				<LayoutLogo />
				<Row>
					<UniversalButton
						onPress={() => setIsOpenCamera(() => true)}
						title='Войти по QR-коду'
					/>
					<Typography align='center' variant='span' soft text='или' />
					<UniversalButton
						onPress={() => setIsLocalAuth(() => true)}
						title='По логину и паролю'
					/>
				</Row>
			</Container>
		)
	}

	return <QrCode onChangeScreen={() => setIsLocalAuth(() => true)} />
}

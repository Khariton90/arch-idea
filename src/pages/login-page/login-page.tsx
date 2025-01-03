import { QrCode } from '@/entities/session/ui/qr-code'
import { useContext, useState } from 'react'
import styled from 'styled-components/native'
import { LayoutLogo } from '@/widgets'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
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

	if (!isOpenCamera) {
		return (
			<Container theme={theme}>
				<LayoutLogo />
				<UniversalButton
					onPress={() => setIsOpenCamera(state => true)}
					title='Войти по QR-коду'
				/>
			</Container>
		)
	}

	return <QrCode navigation={navigation} />
}

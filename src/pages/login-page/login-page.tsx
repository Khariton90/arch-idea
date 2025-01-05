import { QrCode } from '@/entities/session/ui/qr-code'
import { useContext, useState } from 'react'
import styled from 'styled-components/native'
import { LayoutLogo } from '@/widgets'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { Typography } from '@/shared/ui/typography/typography'

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
`

export function LoginPage({ navigation }: any): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [isOpenCamera, setIsOpenCamera] = useState(false)

	if (!isOpenCamera) {
		return (
			<Container theme={theme}>
				<LayoutLogo />
				<Row>
					<UniversalButton
						onPress={() => setIsOpenCamera(state => true)}
						title='Войти по QR-коду'
					/>
					<Typography align='center' variant='span' soft text='или' />
					<UniversalButton onPress={() => {}} title='По логину и паролю' />
				</Row>
			</Container>
		)
	}

	return <QrCode navigation={navigation} />
}

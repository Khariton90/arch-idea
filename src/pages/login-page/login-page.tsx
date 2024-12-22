import { QrCode } from '@/entities/session/ui/qr-code'
import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import { LayoutLogo } from '@/widgets'
import Root from '@/app/styles/Root'
import { delay } from '@/shared/lib/delay'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { useAppSelector } from '@/shared/hooks/hooks'
import { AppRoutes } from '@/shared/model/types'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
	align-items: center;
	justify-content: center;
	gap: 20px;
`

const Button = styled.TouchableOpacity`
	background-color: ${Colors.success};
	padding: 10px 40px;
	align-items: center;
	justify-content: center;
	border-radius: ${Root.radius10};
`

export function LoginPage({ navigation }: any): JSX.Element {
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
			<Container>
				<LayoutLogo />
				{token ? (
					<Button onPress={() => navigation.replace(AppRoutes.HomePage)}>
						<Text>Войти</Text>
					</Button>
				) : (
					<Button onPress={() => setIsLoading(state => true)}>
						<Text>Войти по QR-коду</Text>
					</Button>
				)}
			</Container>
		)
	}

	return <QrCode navigation={navigation} />
}

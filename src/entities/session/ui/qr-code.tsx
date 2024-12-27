import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import {
	BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from 'expo-camera'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAuthByQrCodeMutation } from '../api'
import styled from 'styled-components/native'
import { LayoutLogo } from '@/widgets'
import { setIsAuthorized } from '../model/slice'
import { saveAccessToken } from '../api/session-api'
import { AuthRdo } from '../model/types'
import { ThemeContext } from '@/shared/colors.styled'
import { AppRoutes } from '@/shared/model/types'
import { Typography } from '@/shared/ui/typography/typography'

const Container = styled.View<{ background: string }>`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({ background }) => background};
	gap: 20px;
`

const Button = styled.TouchableOpacity<{ background: string }>`
	background-color: ${({ background }) => background};
	padding: 10px;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
`

const CameraWrapper = styled.View<{ border: string }>`
	height: 30%;
	width: 80%;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 1;
	border-radius: 10px;
	overflow: hidden;
	border: 2px solid ${({ border }) => border};
`

const Message = styled.Text`
	text-align: center;
	padding-bottom: 10px;
`

export function QrCode({ navigation }: any) {
	const { theme } = useContext(ThemeContext)
	const [permission, requestPermission] = useCameraPermissions()
	const dispatch = useAppDispatch()
	const [result, setResult] = useState('')

	const isAuthorized = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized
	)

	const [authByQrCode, { data: account, isLoading, isSuccess, isError }] =
		useAuthByQrCodeMutation()

	const authUser = async (result: BarcodeScanningResult) => {
		setResult(state => result.data)

		if (result.data) {
			await authByQrCode({ sub: result.data })
		}
	}

	const setTokenData = async (data: AuthRdo) => {
		await saveAccessToken(data)
		dispatch(setIsAuthorized(data.access_token))
	}

	useEffect(() => {
		if (isAuthorized) {
			navigation.replace(AppRoutes.HomePage)
		}
	}, [isAuthorized])

	useEffect(() => {
		if (account) {
			setTokenData(account)
		}
	}, [isSuccess, account])

	useEffect(() => {
		requestPermission()
	}, [])

	if (!permission || isLoading) {
		return <LoadingIndicator />
	}

	if (!permission.granted) {
		return (
			<Container background={theme.colors.background}>
				<Message>Мы нуждаемся в вашем разрешении для показа камеры</Message>
				<Button background={theme.colors.primary} onPress={requestPermission} />
			</Container>
		)
	}

	return (
		<Container background={theme.colors.background}>
			<LayoutLogo />
			<CameraWrapper border={theme.colors.primary}>
				<CameraView
					style={styles.camera}
					facing={'back'}
					barcodeScannerSettings={{
						barcodeTypes: ['qr'],
					}}
					onBarcodeScanned={!result ? authUser : undefined}
				></CameraView>
			</CameraWrapper>
			{isError && result ? (
				<View style={{ gap: 10 }}>
					<Typography
						variant='p'
						text={'Невозможно войти qr code недействителен'}
					/>
					<Button
						background={theme.colors.primary}
						onPress={() => setResult('')}
					>
						<Text>Попробовать еще</Text>
					</Button>
				</View>
			) : null}
		</Container>
	)
}

const styles = StyleSheet.create({
	camera: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
	},
})

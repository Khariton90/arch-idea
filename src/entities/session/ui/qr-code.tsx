import { useAppDispatch } from '@/shared/hooks/hooks'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import {
	BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from 'expo-camera'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, Vibration, View } from 'react-native'
import { useAuthByQrCodeMutation } from '../api'
import styled from 'styled-components/native'
import { LayoutLogo } from '@/widgets'
import { addSessionData } from '../model/slice'
import { ThemeContext } from '@/shared/colors.styled'
import { Typography } from '@/shared/ui/typography/typography'
import * as Device from 'expo-device'
import { saveToken } from '../api/session-api'
import { delay } from '@/shared/lib/delay'

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
	const [result, setResult] = useState('')
	const [modelName] = useState(Device.modelName)
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useAppDispatch()

	const [authByQrCode, { data: authData, isError }] = useAuthByQrCodeMutation()

	const openCamera = async () => {
		setIsLoading(() => true)
		await delay()
		setIsLoading(() => false)
	}

	const authUser = async (result: BarcodeScanningResult) => {
		setResult(state => result.data)
		if (result.data) {
			Vibration.vibrate(50)
			await authByQrCode({ sub: result.data, modelName: modelName ?? '' })
		}
	}

	useCameraPermissions()

	useEffect(() => {
		openCamera()
	}, [])

	useEffect(() => {
		if (authData) {
			dispatch(addSessionData(authData))
			saveToken(authData)
		}
	}, [authData, dispatch])

	useEffect(() => {
		if (isError) {
			Vibration.vibrate(100)
		}
	}, [isError])

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
			{isError ? (
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

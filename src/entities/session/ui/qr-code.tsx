import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import {
	BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from 'expo-camera'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { delay } from '@/shared/lib/delay'
import { useAuthByQrCodeMutation } from '../api'
import styled from 'styled-components/native'
import { LayoutLogo } from '@/widgets'
import { setIsAuthorized } from '../model/slice'
import { saveAccessToken } from '../api/session-api'
import { AuthRdo } from '../model/types'

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.background};
	gap: 20px;
`

const ErrorText = styled.Text`
	color: ${Colors.alert};
	font-size: 14px;
`
const Button = styled.TouchableOpacity`
	background-color: ${Colors.success};
	padding: 10px;
	align-items: center;
	justify-content: center;
	border-radius: ${Root.radius10};
`

const CameraWrapper = styled.View`
	height: 30%;
	width: 80%;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 1;
	border-radius: 10px;
	overflow: hidden;
	border: 2px solid ${Colors.success};
`

const Message = styled.Text`
	text-align: center;
	padding-bottom: 10px;
`

export function QrCode({ navigation }: any) {
	const [permission, requestPermission] = useCameraPermissions()
	const dispatch = useAppDispatch()
	const [result, setResult] = useState('')

	const isAuthorized = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized
	)

	const [
		authByQrCode,
		{ data: account, isLoading, isSuccess, isError, data, error },
	] = useAuthByQrCodeMutation()

	const authUser = async (result: BarcodeScanningResult) => {
		setResult(state => result.data)

		if (result.data) {
			await authByQrCode({ sub: result.data })
			await delay()
		}
	}
	const setTokenData = async (data: AuthRdo) => {
		await saveAccessToken(data)
		dispatch(setIsAuthorized(data.access_token))
	}

	useEffect(() => {
		if (isAuthorized) {
			navigation.replace('Home')
		}
	}, [isAuthorized])

	useEffect(() => {
		if (data) {
			setTokenData(data)
		}
	}, [isSuccess, data])

	useEffect(() => {
		requestPermission()
	}, [])

	if (!permission || isLoading) {
		return <LoadingIndicator />
	}

	if (!permission.granted) {
		return (
			<Container>
				<Message>Мы нуждаемся в вашем разрешении для показа камеры</Message>
				<Button onPress={requestPermission} />
			</Container>
		)
	}

	return (
		<Container>
			<LayoutLogo />
			<CameraWrapper>
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
					<ErrorText>Невозможно войти qr code недействителен</ErrorText>
					<Button onPress={() => setResult('')}>
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

import { useAppDispatch } from '@/shared/hooks/hooks'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Vibration, View } from 'react-native'
import { useAuthByQrCodeMutation } from '../api'
import styled from 'styled-components/native'
import { LayoutLogo } from '@/widgets'
import { addSessionData } from '../model/slice'
import { ThemeContext } from '@/shared/colors.styled'
import { Typography } from '@/shared/ui/typography/typography'
import * as Device from 'expo-device'
import { saveToken } from '../api/session-api'
import { delay } from '@/shared/lib/delay'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'

const Container = styled.View<{ background: string }>`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${({ background }) => background};
	gap: 20px;
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

const Row = styled.View`
	margin: 0 20px;
	gap: 12px;
`

interface Props {
	onChangeScreen: () => void
}

export function QrCode({ onChangeScreen }: Props) {
	const { theme } = useContext(ThemeContext)
	const [permission, requestPermission] = useCameraPermissions()
	const [result, setResult] = useState('')
	const [modelName] = useState(Device.modelName)
	const [isLoading, setIsLoading] = useState(false)
	const [count, setCount] = useState(0)
	const dispatch = useAppDispatch()

	const [authByQrCode, { data: authData, isError }] = useAuthByQrCodeMutation()

	const openCamera = async () => {
		setIsLoading(() => true)
		await delay()
		setIsLoading(() => false)
	}

	const authUser = async (result: string) => {
		setCount(prev => (prev += 1))
		Vibration.vibrate(50)
		await authByQrCode({ sub: result, modelName: modelName ?? '' })
	}

	useEffect(() => {
		openCamera()
	}, [])

	useEffect(() => {
		if (result && !count) {
			let data = result
			setResult(() => '')
			authUser(data)
		}
	}, [result])

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
				<Row>
					<LayoutLogo />
					<Typography
						variant='h2'
						align='center'
						text={'Мы нуждаемся в вашем разрешении для показа камеры'}
					/>

					<UniversalButton
						title='Попробовать еще'
						onPress={requestPermission}
					/>
				</Row>
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
					onBarcodeScanned={scanned => setResult(() => scanned.data)}
				></CameraView>
			</CameraWrapper>
			{isError && result ? (
				<View style={{ gap: 10 }}>
					<Typography
						variant='p'
						text={'Невозможно войти qr code недействителен'}
					/>
					<UniversalButton
						title='Попробовать еще'
						onPress={() => setResult('')}
					/>
				</View>
			) : null}
			<Typography variant='span' soft text={'или'} />
			<UniversalButton title='К логину и паролю' onPress={onChangeScreen} />
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

import { Typography } from '@/shared/ui/typography/typography'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import * as Brightness from 'expo-brightness'
import { BASE_URL } from '@/shared/api/base-api'
import { useAppSelector } from '@/shared/hooks/hooks'

const Box = styled.View`
	padding: 20px 10px;
	justify-content: center;
	align-items: center;
	min-width: 200px;
	min-height: 200px;
`

interface Props {
	isOpen: boolean
}

export function QrCodeModal({ isOpen }: Props): JSX.Element {
	const [currentBrightness, setCurrentBrightness] = useState<number>(0.8)
	const token = useAppSelector(({ sessionSlice }) => sessionSlice.accessToken)

	const setBrightness = async () => {
		try {
			const { status } = await Brightness.getPermissionsAsync()
			if (status !== 'granted') {
				const { status } = await Brightness.requestPermissionsAsync()
				if (status !== 'granted') {
					return
				}
			}

			const currentValue = await Brightness.getSystemBrightnessAsync()
			setCurrentBrightness(currentValue)

			await Brightness.setSystemBrightnessAsync(1)
		} catch (error) {}
	}

	const restoreBrightness = async () => {
		try {
			await Brightness.setSystemBrightnessAsync(currentBrightness)
		} catch (error) {}
	}

	useEffect(() => {
		if (isOpen) {
			setBrightness()
		} else {
			restoreBrightness()
		}
	}, [isOpen])

	return (
		<>
			<Typography variant='h1' text='QR Code для входа' />
			<Box>
				<Image
					width={200}
					height={200}
					source={{
						uri: `${BASE_URL}/images/image-qr.png`,
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}}
				/>
			</Box>
		</>
	)
}

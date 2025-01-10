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

export function QrCodeModal(): JSX.Element {
	const token = useAppSelector(({ sessionSlice }) => sessionSlice.accessToken)

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

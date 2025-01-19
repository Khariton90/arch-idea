import { Typography } from '@/shared/ui/typography/typography'
import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
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
	const department = useAppSelector(({ userSlice }) => userSlice.department)
	const uri = `${BASE_URL}/images/${department}.webp`

	return (
		<>
			<Typography variant='h1' text='QR Code для входа' />
			<Box>
				{department && (
					<Image
						width={200}
						height={200}
						source={{
							uri,
						}}
					/>
				)}
			</Box>
		</>
	)
}

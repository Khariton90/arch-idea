import { Typography } from '@/shared/ui/typography/typography'
import React from 'react'
import { ViewProps } from 'react-native'
import styled from 'styled-components/native'

const Row = styled.View<ViewProps>`
	flex-direction: row;
	justify-content: space-between;
	padding: 0 10px;
`

export function ThemeModal(): JSX.Element {
	return (
		<>
			<Typography variant='h1' text='Тема' />
		</>
	)
}

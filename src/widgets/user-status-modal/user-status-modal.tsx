import { Typography } from '@/shared/ui/typography/typography'
import React from 'react'
import { TextProps } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import styled from 'styled-components/native'

const Row = styled.View<ViewProps & { border?: boolean }>`
	flex-direction: row;
	justify-content: space-between;
	padding: 0 10px;
	border-bottom-width: ${({ border }) => (border ? '1px' : '0px')};
	border-bottom-color: #ccc;
`

const DescriptionBox = styled.View`
	padding: 20px 10px;
	border-radius: 10px;
`

interface Props {
	color: string
	background: string
}

export function UserStatusModal({ color, background }: Props): JSX.Element {
	return (
		<>
			<Row>
				<Typography variant='h1' text='Ваш статус' />
				<Typography variant='h1' text='Спец' />
			</Row>

			<DescriptionBox style={{ backgroundColor: background }}>
				<Typography variant='p' text='Старайтесь держать активность' />
				<Typography
					variant='p'
					text='Завершённые идеи повышают ваш статус, когда проект или задание
					полностью выполнены и готовы к использованию.'
				/>
				<Typography
					variant='p'
					text='После завершения идеи переходят в стадию внедрения, где они начинают
					приносить пользу.'
				/>
			</DescriptionBox>

			<Row border>
				<Typography variant='h2' text='Спец' />
				<Typography variant='h2' text='<= 0 идей' />
			</Row>

			<Row border>
				<Typography variant='h2' text='Мастер' />
				<Typography variant='h2' text='<= 20 идей' />
			</Row>

			<Row border>
				<Typography variant='h2' text='Профи' />
				<Typography variant='h2' text='<= 30 идей' />
			</Row>

			<Row border>
				<Typography variant='h2' text='Эксперт' />
				<Typography variant='h2' text='<= 40 идей' />
			</Row>

			<Row>
				<Typography variant='h2' text='Супер-эксперт' />
				<Typography variant='h2' text='<= 50 идей' />
			</Row>
		</>
	)
}

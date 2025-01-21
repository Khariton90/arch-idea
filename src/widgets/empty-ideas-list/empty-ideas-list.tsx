import { Typography } from '@/shared/ui'
import styled from 'styled-components/native'

const Box = styled.View`
	padding: 20px 0;
	justify-content: center;
	align-items: center;
	align-content: center;
`

export function EmptyIdeasList(): JSX.Element {
	return (
		<Box>
			<Typography variant='h1' text={'Пока здесь пусто...'} />
			<Typography
				variant='span'
				soft
				text={'Будьте первым, кто предложит идею!'}
			/>
		</Box>
	)
}

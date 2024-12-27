import { Typography } from '@/shared/ui/typography/typography'
import styled from 'styled-components/native'

const Box = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
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

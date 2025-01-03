import styled from 'styled-components/native'
import { Image } from 'react-native'
import { Typography } from '@/shared/ui/typography/typography'

const Box = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

export function CommentsNotFound(): JSX.Element {
	return (
		<Box>
			<Image
				width={200}
				height={260}
				source={require('../../../../assets/images/not-found-200.webp')}
			/>
			<Typography variant='h1' text='Оставить комментарий' />
			<Typography
				variant='p'
				soft
				text='Чтобы начать обсуждение с коллегами и '
			/>
			<Typography
				variant='p'
				soft
				text='детально разобрать идею, оставьте свой'
			/>
			<Typography variant='p' soft text='комментарий ниже' />
		</Box>
	)
}

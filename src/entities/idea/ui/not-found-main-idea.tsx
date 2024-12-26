import { Typography } from '@/shared/ui/typography/typography'
import { Image } from 'react-native'
import styled from 'styled-components/native'

const Box = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

export function NotFoundMainIdea(): JSX.Element {
	return (
		<Box>
			<Image
				width={200}
				height={260}
				source={require('../../../../assets/images/not-found-ideas-300.avif')}
			/>
			<Typography variant='h1' text='Пока у вас нет новых идей?' />
			<Typography variant='h2' soft text='Начните добавлять их прямо сейчас!' />
			<Typography
				variant='h2'
				soft
				text='Повышайте свой статус, вносите вклад '
			/>
			<Typography
				variant='h2'
				soft
				text=' в развитие компании и открывайте новые'
			/>
			<Typography variant='h2' soft text='возможности для себя' />
		</Box>
	)
}

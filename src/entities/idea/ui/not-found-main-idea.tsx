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
				source={require('../../../../assets/images/my-not-found-200.webp')}
			/>
			<Typography variant='h1' text='Пока у вас нет новых идей?' />
			<Typography variant='p' soft text='Начните добавлять их прямо сейчас!' />
			<Typography
				variant='p'
				soft
				text='Повышайте свой статус, вносите вклад '
			/>
			<Typography
				variant='p'
				soft
				text=' в развитие компании и открывайте новые'
			/>
			<Typography variant='p' soft text='возможности для себя' />
		</Box>
	)
}

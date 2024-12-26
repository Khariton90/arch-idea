import { Typography } from '@/shared/ui/typography/typography'
import { Image } from 'react-native'
import styled from 'styled-components/native'

const Box = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

export function NotFoundFavoriteIdea(): JSX.Element {
	return (
		<Box>
			<Image
				width={200}
				height={260}
				source={require('../../../../assets/images/not-found-300.avif')}
			/>
			<Typography variant='h1' text='Вы ничего не добавили' />
			<Typography variant='h1' text='в избранное' />
			<Typography variant='h2' soft text='Сохраняйте понравившиеся идеи,' />
			<Typography variant='h2' soft text='к которым планируете вернуться' />
		</Box>
	)
}

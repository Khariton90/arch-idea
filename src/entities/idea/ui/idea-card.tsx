import { IdeaRdo } from '../model/types'
import { ReactNode, useContext } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import { AppRoutes } from '@/shared/model/types'
import { ThemeContext } from '@/shared/colors.styled'
import { formatDate } from '@/shared/lib/format-date'
import { Typography } from '@/shared/ui/typography/typography'
import { TouchableOpacityProps, View } from 'react-native'
import { Chip } from '@/shared/ui/chip'

const Container = styled.TouchableOpacity<
	TouchableOpacityProps & {
		border: string
		background: string
	}
>`
	width: 100%;
	min-height: 200px;
	background: ${({ background }) => background};
	border: 1px solid ${({ border }) => border};
	border-radius: 20px;
	margin: 10px 0;
	padding: 16px 20px;
	justify-content: space-between;
	gap: 8px;
`

const Row = styled.View<{ direction?: boolean }>`
	width: 100%;
	flex-direction: ${({ direction }) => (direction ? 'column' : 'row')};
	justify-content: ${({ direction }) =>
		direction ? 'flex-start' : 'space-between'};
	align-items: ${({ direction }) => (direction ? 'flex-start' : 'flex-end')};
	gap: 6px;
`

interface Props {
	idea: IdeaRdo
	likeDislikeSlot: ReactNode
	wishlistSlot: ReactNode
	navigation: NativeStackNavigationProp<any, any, any>
}

export function IdeaCard({
	idea,
	likeDislikeSlot,
	wishlistSlot,
	navigation,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<Container
			border={theme.colors.border}
			background={theme.colors.backdrop}
			onPress={() => navigation.navigate(AppRoutes.IdeaDetailsPage, idea)}
		>
			<Row>
				<View />
				{wishlistSlot}
			</Row>

			<Row direction>
				<Typography
					ellipsizeMode='tail'
					numberOfLines={1}
					variant='h2'
					text={idea.title}
				/>

				<Typography
					ellipsizeMode='tail'
					numberOfLines={2}
					variant='span'
					soft
					text={idea.description}
				/>
			</Row>

			<Row direction>
				<Chip title={`Статус: ${idea.status}`} size='md' color='success' />
				<Chip title={`Приоритет: ${idea.priority}`} size='md' color='success' />
				<Chip
					title={`Подразделение: ${idea.subDepartment}`}
					size='md'
					color='success'
				/>
			</Row>

			<Row>
				<Typography variant='span' soft text={formatDate(idea.createdAt)} />
				{likeDislikeSlot}
			</Row>
		</Container>
	)
}

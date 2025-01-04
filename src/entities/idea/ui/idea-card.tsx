import { IdeaRdo, Priority } from '../model/types'
import { memo, ReactNode, useCallback, useContext } from 'react'
import styled from 'styled-components/native'
import { AppRoutes } from '@/shared/model/types'
import { ThemeContext } from '@/shared/colors.styled'
import { formatDate } from '@/shared/lib/format-date'
import { Typography } from '@/shared/ui/typography/typography'
import { TouchableOpacityProps, View } from 'react-native'
import { Chip } from '@/shared/ui/chip'
import useCustomNavigation from '@/shared/hooks/use-custom-navigation'

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
	padding: 16px 20px;
	justify-content: space-between;
	gap: 8px;
	box-shadow: 0px 0px 1px #6e6e6e;
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
}

function IdeaCardComponent({
	idea,
	likeDislikeSlot,
	wishlistSlot,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const navigation = useCustomNavigation()

	const handlePress = () => {
		navigation.navigate(AppRoutes.IdeaDetailsPage, idea)
	}

	return (
		<Container
			border={theme.colors.border}
			background={theme.colors.backdrop}
			onPress={handlePress}
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
				<Chip title={`Статус: ${idea.status}`} size='sm' color='success' />
				<Chip title={`Приоритет: ${idea.priority}`} size='sm' color='success' />
				<Chip
					title={`Категория: ${idea.subDepartment}`}
					size='sm'
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

export const IdeaCard = memo(IdeaCardComponent)

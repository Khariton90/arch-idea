import { Colors, Root } from '@/app/styles/variables'
import { TouchableOpacity, ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { Idea, IdeaStatus } from '../model/types'
import { ReactNode } from 'react'
import { ThumbUpIcon } from '@/shared/ui/thumb-up-icon'
import { ThumbDownIcon } from '@/shared/ui/thumb-down-icon'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAppSelector } from '@/shared/hooks/hooks'
import { AddToWishlist } from '@/features/wishlist/add-to-wishlist/add-to-wishlist'

// export interface Idea {
// 	id: number
// 	title: string
// 	description: string
// 	category: Category
// 	priority: Priority
// 	status: Status
// 	creationDate: Date
// 	author: User
// }

const StatusColors = {
	[IdeaStatus.New]: Colors.success,
	[IdeaStatus.Approved]: Colors.primary,
	[IdeaStatus.Rejected]: Colors.alert,
	[IdeaStatus.UnderReview]: Colors.success,
}

interface IdeaItemProps extends ViewProps {
	status: IdeaStatus
}

const IdeaItem = styled.View<IdeaItemProps>`
	min-height: 100px;
	background-color: ${({ status }: { status: IdeaStatus }) =>
		StatusColors[status]};
	border-radius: ${Root.radius10};
	flex: 1;
	padding: 10px 10px 50px;
`

const Title = styled.Text`
	font-size: 18px;
	color: ${Colors.white};
	text-transform: uppercase;
	line-height: 40px;
`

const Description = styled.Text`
	font-size: 12px;
	color: ${Colors.white};
`

const FavoriteBox = styled.View`
	align-self: flex-end;
`

interface Props {
	idea: Idea
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
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Details', idea)}>
			<IdeaItem status={idea.status}>
				<FavoriteBox>{wishlistSlot}</FavoriteBox>

				<Title>{idea.title}</Title>
				<Description ellipsizeMode='tail' numberOfLines={2}>
					{idea.description}
				</Description>

				{likeDislikeSlot}
			</IdeaItem>
		</TouchableOpacity>
	)
}

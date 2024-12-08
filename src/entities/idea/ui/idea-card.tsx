import { TouchableOpacity, ViewProps } from 'react-native'
import { Idea, IdeaStatus } from '../model/types'
import { ReactNode } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'

const StatusColors = {
	[IdeaStatus.New]: Colors.success,
	[IdeaStatus.Approved]: Colors.primary,
	[IdeaStatus.Rejected]: Colors.alert,
	[IdeaStatus.UnderReview]: Colors.success,
}

const IdeaItem = styled.View<ViewProps & { status: IdeaStatus }>`
	height: 100%;
	max-height: 200px;
	background-color: ${({ status }: { status: IdeaStatus }) =>
		StatusColors[status]};
	border-radius: ${Root.radius10};
	flex: 1;
	padding: 10px 10px 60px;
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
				<Title ellipsizeMode='tail' numberOfLines={1}>
					{idea.title}
				</Title>
				<Description ellipsizeMode='tail' numberOfLines={2}>
					{idea.description}
				</Description>
				{likeDislikeSlot}
			</IdeaItem>
		</TouchableOpacity>
	)
}

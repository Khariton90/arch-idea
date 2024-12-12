import { TouchableOpacity, ViewProps } from 'react-native'
import { Idea } from '../model/types'
import { ReactNode } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { TextProps } from 'react-native-svg'
import dayjs from 'dayjs'

const IdeaItem = styled.View<ViewProps>`
	height: 100%;
	max-height: 200px;
	background-color: ${Colors.background};
	border-radius: ${Root.radius10};
	flex: 1;
	padding: 10px 10px 60px;
`

const Title = styled.Text`
	font-size: 16px;
	color: ${Colors.white};
	text-transform: uppercase;
	line-height: 40px;
`

const Description = styled.Text`
	font-size: 12px;
	color: ${Colors.colorMuted};
`

const FavoriteBox = styled.View`
	align-self: flex-end;
`

const StatusText = styled.Text<TextProps & { top?: number; bottom?: number }>`
	font-size: 12px;
	color: ${Colors.colorMuted};
	position: absolute;
	left: 10px;
	top: ${({ top }) => `${top}px`};
`

const DateText = styled.Text<TextProps & { bottom?: number }>`
	font-size: 12px;
	color: ${Colors.colorMuted};
	position: absolute;
	left: 10px;
	bottom: ${({ bottom }) => `${bottom}px`};
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
			<IdeaItem>
				<StatusText top={16}>Статус: {idea.status}</StatusText>
				<FavoriteBox>{wishlistSlot}</FavoriteBox>
				<Title ellipsizeMode='tail' numberOfLines={1}>
					{idea.title}
				</Title>
				<Description ellipsizeMode='tail' numberOfLines={2}>
					{idea.description}
				</Description>
				{likeDislikeSlot}

				<DateText bottom={10}>
					{dayjs(idea.createdAt).format('DD.MM.YYYY')}
				</DateText>
			</IdeaItem>
		</TouchableOpacity>
	)
}

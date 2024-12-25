import { IdeaRdo } from '../model/types'
import { ReactNode, useContext } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { TextProps } from 'react-native-svg'
import dayjs from 'dayjs'
import { AppRoutes } from '@/shared/model/types'
import {
	darkTheme,
	ThemeContext,
	ViewWithThemeProps,
} from '@/shared/colors.styled'
import { formatDate } from '@/shared/lib/format-date'

const CardWrapper = styled.TouchableOpacity`
	margin: 10px 0;
`

const IdeaItem = styled.View<ViewWithThemeProps>`
	height: 100%;
	max-height: 200px;
	background-color: ${({ theme }) => theme.colors.surface};
	border: 1px solid ${({ theme }) => theme.colors.border};
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
		<CardWrapper
			onPress={() => navigation.navigate(AppRoutes.IdeaDetailsPage, idea)}
		>
			<IdeaItem theme={theme}>
				<FavoriteBox>{wishlistSlot}</FavoriteBox>
				<StatusText top={16}>Статус: {idea.status}</StatusText>
				<Title
					style={{ color: theme.colors.text }}
					ellipsizeMode='tail'
					numberOfLines={1}
				>
					{idea.title}
				</Title>
				<Description
					style={{ color: theme.colors.text, opacity: 0.7 }}
					ellipsizeMode='tail'
					numberOfLines={2}
				>
					{idea.description}
				</Description>
				{likeDislikeSlot}

				<DateText bottom={10}>{formatDate(idea.createdAt)}</DateText>
			</IdeaItem>
		</CardWrapper>
	)
}

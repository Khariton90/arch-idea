import { TextProps, View } from 'react-native'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { ReactNode } from 'react'
import React from 'react'
import { IdeaRdo } from '../model/types'
import dayjs from 'dayjs'

const Card = styled.View`
	background-color: ${Colors.lightGrey};
	border-radius: ${Root.radius10};
	flex: 1;
	margin: 40px 10px;
	overflow: hidden;
`

const CardHeader = styled.View`
	padding: 20px;
	border-bottom-color: ${Colors.btnGrey};
	border-bottom-width: 1px;
`

const Title = styled.Text`
	color: ${Colors.white};
	font-weight: 600;
	font-size: 16px;
	margin: 10px 0;
`

const CardContent = styled.View`
	padding: 20px;
	gap: 10px;
`

const SmallText = styled.Text<TextProps & { color?: string }>`
	color: ${({ color }) => color ?? Colors.white};
	font-size: 12px;
`

const AuthorBox = styled.View`
	flex-direction: row;
	gap: 6px;
	align-items: center;
	position: absolute;
	right: 10px;
	top: 20px;
`

const Avatar = styled.View`
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background-color: ${Colors.btnGrey};
	justify-content: center;
	align-items: center;
`

const Row = styled.View`
	flex-direction: row;
	align-items: center;
`

const CardFooter = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 10px;
	margin-top: auto;
`

const FavoriteBox = styled.View`
	position: absolute;
	right: 10px;
	top: 10px;
`

interface Props {
	idea: IdeaRdo
	likesDisLakesSlot: ReactNode
	wishListSlot: ReactNode
	commentsSlot: ReactNode
}

export function IdeaDetailsCard({
	idea,
	likesDisLakesSlot,
	wishListSlot,
	commentsSlot,
}: Props): JSX.Element {
	return (
		<Card>
			<CardHeader>
				<FavoriteBox>{wishListSlot}</FavoriteBox>
				<Title>Идея от {dayjs(idea.createdAt).format('DD.MM.YYYY')}</Title>
				<Row>
					<SmallText color={Colors.colorMuted}>Cтатус: </SmallText>
					<SmallText>{idea.status} </SmallText>
				</Row>
			</CardHeader>
			<CardContent>
				<AuthorBox>
					<View>
						<SmallText color={Colors.colorMuted}>Автор</SmallText>
						<SmallText>{idea.userId.slice(0, 6)}</SmallText>
					</View>
					<Avatar>
						<SmallText>A</SmallText>
					</Avatar>
				</AuthorBox>

				<Row>
					<SmallText color={Colors.colorMuted}>Категория: </SmallText>
					<SmallText>{idea.subDepartment}</SmallText>
				</Row>

				<Row>
					<SmallText color={Colors.colorMuted}>Приоритет: </SmallText>
					<SmallText>{idea.priority}</SmallText>
				</Row>

				<Title>{idea.title}</Title>
				<SmallText>{idea.description}</SmallText>
			</CardContent>
			<CardFooter>
				{commentsSlot}

				{likesDisLakesSlot}
			</CardFooter>
		</Card>
	)
}

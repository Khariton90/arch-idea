import { LikeDislikeButtons } from '@/features/vote'
import { AddToWishlist } from '@/features/wishlist'
import { CommentsIcon } from '@/shared/ui/comments-icon'
import { TextProps, View } from 'react-native'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { ReactNode } from 'react'

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

const CommentBox = styled.TouchableOpacity`
	flex-direction: row;
	align-items: flex-start;
	border-radius: ${Root.radius10};
	background-color: ${Colors.btnGrey};
	padding: 6px 12px;
	gap: 6px;
`

const FavoriteBox = styled.View`
	position: absolute;
	right: 10px;
	top: 10px;
`

interface Props {
	title: string
	id: number
	likesDisLakesSlot: ReactNode
}

export function IdeaDetailsCard({
	title,
	id,
	likesDisLakesSlot,
}: Props): JSX.Element {
	return (
		<Card>
			<CardHeader>
				<FavoriteBox>
					<AddToWishlist id={id} />
				</FavoriteBox>
				<Title>{title}</Title>
				<Row>
					<SmallText color={Colors.colorMuted}>Cтатус: </SmallText>
					<SmallText>В работе</SmallText>
				</Row>
			</CardHeader>
			<CardContent>
				<AuthorBox>
					<View>
						<SmallText color={Colors.colorMuted}>Автор</SmallText>
						<SmallText>Evgeniy</SmallText>
					</View>
					<Avatar>
						<SmallText>E</SmallText>
					</Avatar>
				</AuthorBox>

				<Row>
					<SmallText color={Colors.colorMuted}>Категория: </SmallText>
					<SmallText>Склад</SmallText>
				</Row>

				<Row>
					<SmallText color={Colors.colorMuted}>Приоритет: </SmallText>
					<SmallText>Высокий</SmallText>
				</Row>

				<Title>Оформление рабочего места кладовщика</Title>
				<SmallText>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
					accusantium velit amet accusamus autem corrupti, distinctio
					consequatur sed quis eius impedit asperiores fuga, nemo, quas nam
					suscipit? Similique, at harum! Eos ea alias commodi velit expedita
					dolor dolorem numquam porro, animi aliquam cupiditate voluptatum
					tenetur? Neque praesentium unde aliquid soluta assumenda? Blanditiis
					rem quia ad debitis id odit temporibus eaque. Commodi labore
					doloremque ea numquam maiores laudantium provident, impedit cumque eos
					praesentium cupiditate, repellendus et. Reiciendis a cum saepe id in
					odio sunt, excepturi officia ratione tempore incidunt qui est?
					Possimus consectetur cum quam! Voluptatum, amet minus minima
					perspiciatis illo magni! Dolores cumque voluptate eos minus cupiditate
					vero deserunt aspernatur, quo maxime quod modi maiores nihil.
					Laboriosam cupiditate accusamus voluptas. Voluptatibus sed minima
					porro adipisci ab tempora blanditiis eaque exercitationem nemo,
					incidunt maxime repellendus temporibus quasi officiis facilis autem
					nostrum itaque culpa quaerat mollitia id accusantium assumenda quo?
					Molestiae, distinctio? Qui nulla temporibus nostrum necessitatibus
					nesciunt, minus doloribus est ipsa magnam ad harum?
				</SmallText>
			</CardContent>
			<CardFooter>
				<CommentBox>
					<CommentsIcon />
					<SmallText color={Colors.background}>Комментарии 41</SmallText>
				</CommentBox>

				{likesDisLakesSlot}
			</CardFooter>
		</Card>
	)
}

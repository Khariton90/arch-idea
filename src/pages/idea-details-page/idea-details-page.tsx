import { Colors, Root } from '@/app/styles/variables'
import { LikeDislikeButtons } from '@/features/vote/like-dislike-buttons/like-dislike-buttons'
import { CommentsIcon } from '@/shared/ui/comments-icon'
import { useEffect } from 'react'
import { Text, TextProps, View } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
`

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
	border-bottom-width: 1;
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

export function IdeaDetailsPage({ route, navigation }: any): JSX.Element {
	const { title } = route.params

	useEffect(() => {
		navigation.setOptions({
			title,
		})
	})
	return (
		<Container>
			<Card>
				<CardHeader>
					<Title>Идея от 27 ноября</Title>
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
						В твоём мозгу неправильный шаблон. You've got the wrong template
						your mind. Хотя допускаются символы-шаблоны, его рекомендуется как
						можно точнее ограничить доступ к серверам. Although wildcards are
						permitted, it is recommended to be as specific as possible to
						restrict access to the servers. А, один вопрос... мы заменяем
						контрольные шаблоны в автомобильных коленвалах, но должны ли мы
						калибровать их под валы Панцеров или Рено? Ah, one thing... we are
						replacing the test gauges in the automobile crank shafts, but should
						we calibrate for the Panzer shafts or the Renault FT? В твоём мозгу
						неправильный шаблон. You've got the wrong template your mind. Хотя
						допускаются символы-шаблоны, его рекомендуется как можно точнее
						ограничить доступ к серверам. Although wildcards are permitted, it
						is recommended to be as specific as possible to restrict access to
						the servers. А, один вопрос... мы заменяем контрольные шаблоны в
						автомобильных коленвалах, но должны ли мы калибровать их под валы
						Панцеров или Рено? Ah, one thing... we are replacing the test gauges
						in the automobile crank shafts, but should we calibrate for the
						Panzer shafts or the Renault FT?
					</SmallText>
				</CardContent>

				<CardFooter>
					<CommentBox>
						<CommentsIcon />
						<SmallText color={Colors.background}>Комментарии 41</SmallText>
					</CommentBox>

					<LikeDislikeButtons />
				</CardFooter>
			</Card>
		</Container>
	)
}

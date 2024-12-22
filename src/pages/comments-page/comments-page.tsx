import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import {
	useCreateCommentMutation,
	useFindCommentsQuery,
} from '@/entities/comment/api'
import { CommentListRdo } from '@/entities/comment/model/types'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { ArrowUpCircleIcon } from '@/shared/ui/arrow-up-circle-icon'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
	padding-top: 20px;
`

type Props = {
	route: RouteProp<RootStackParamList, AppRoutes.CommentsPage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function CommentsPage({ navigation, route }: Props): JSX.Element {
	const ideId = route.params.id
	const { data: comments, isLoading, isSuccess } = useFindCommentsQuery(ideId)

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
			<Container>
				{isLoading && <LoadingIndicator />}
				{comments && <CommentsList commentData={comments} ideaId={ideId} />}
			</Container>
		</SafeAreaView>
	)
}

const CommentsContainer = styled.View`
	flex: 1;
	padding-bottom: 100px;
`

const CreateCommentForm = styled.View`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 80px;
	background-color: ${Colors.lightGrey};
	flex-direction: row;
	padding: 10px;
	align-items: center;
	gap: ${Root.gap10};
`

const CommentInput = styled.TextInput`
	border-radius: ${Root.radius10};
	padding: 10px 40px 10px 10px;
	border: 1px solid ${Colors.grey};
	color: ${Colors.white};
	flex: 1;
`

const CommentButton = styled.TouchableOpacity`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	justify-content: center;
	align-items: center;
`

const Title = styled.Text`
	color: ${Colors.white};
	text-align: center;
`

const CommentItem = styled.View`
	background-color: ${Colors.lightGrey};
	padding: 10px;

	margin: 0 10px 10px 10px;
	border-radius: ${Root.radius10};
	gap: ${Root.gap10};
`

const CommentItemDateText = styled.Text`
	color: ${Colors.colorMuted};
	font-size: 12px;
	text-align: right;
`

const UserBox = styled.View`
	flex-direction: row;
	gap: ${Root.gap10};
	align-items: center;
`

const UserAvatar = styled.View`
	width: 30px;
	height: 30px;
	background-color: ${Colors.success};
	justify-content: center;
	align-items: center;
	justify-content: center;
	border-radius: ${Root.radius10};
`

const CommentText = styled.Text`
	color: ${Colors.white};
	font-weight: 500;
`

type CommentsListProps = {
	commentData: CommentListRdo
	ideaId: string
}

export function CommentsList({
	commentData,
	ideaId,
}: CommentsListProps): JSX.Element {
	const [comment, setComment] = useState('')
	const [createComment, { isLoading, isError, isSuccess }] =
		useCreateCommentMutation()

	const handleSubmit = async () => {
		await createComment({ ideaId, content: comment })
	}

	useEffect(() => {
		if (isSuccess) {
			setComment(prev => '')
		}
	}, [isSuccess])

	return (
		<CommentsContainer>
			{isLoading && <LoadingIndicator />}

			{!commentData.totalCount ? (
				<Title>Комментариев пока нет...</Title>
			) : (
				<FlatList
					data={commentData.comments}
					renderItem={({ item }) => (
						<CommentItem key={item.id}>
							<UserBox>
								<UserAvatar>
									<CommentText>A</CommentText>
								</UserAvatar>
								<CommentText>{item.user.firstName || 'Аноним'}</CommentText>
							</UserBox>

							<CommentText>{item.content}</CommentText>

							<CommentItemDateText>
								{dayjs(item.createdAt).format('DD.MM.YYYY HH:mm')}
							</CommentItemDateText>
						</CommentItem>
					)}
				/>
			)}

			<CreateCommentForm>
				<CommentInput
					placeholder='Комментарий'
					placeholderTextColor={Colors.grey}
					value={comment}
					onChangeText={text => setComment(text)}
				/>

				<CommentButton onPress={handleSubmit}>
					<ArrowUpCircleIcon />
				</CommentButton>
			</CreateCommentForm>
		</CommentsContainer>
	)
}

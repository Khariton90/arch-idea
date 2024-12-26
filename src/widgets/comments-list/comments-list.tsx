import { CommentListRdo } from '@/entities/comment/model/types'
import { CommentItem, CommentsNotFound } from '@/entities/comment/ui'
import { CreateCommentForm } from '@/features/comment'
import { ThemeContext } from '@/shared/colors.styled'
import { useContext } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View<{ background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	padding: 20px 0 100px;
`

type Props = {
	commentData: CommentListRdo
	ideaId: string
}

export function CommentsList({ commentData, ideaId }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<Container background={theme.colors.backdrop}>
			{!commentData.totalCount ? (
				<CommentsNotFound />
			) : (
				<FlatList
					data={commentData.comments}
					renderItem={({ item }) => <CommentItem comment={item} />}
				/>
			)}
			<CreateCommentForm ideaId={ideaId} />
		</Container>
	)
}

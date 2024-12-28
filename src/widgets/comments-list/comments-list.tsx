import { useFindCommentsQuery } from '@/entities/comment/api'
import { CommentItem, CommentsNotFound } from '@/entities/comment/ui'
import { CreateCommentForm } from '@/features/comment'
import { ThemeContext } from '@/shared/colors.styled'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { useContext, useEffect, useRef } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View<{ background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	padding: 20px 0 100px;
`

type Props = {
	ideaId: string
}

export function CommentsList({ ideaId }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const flatListRef = useRef<FlatList>(null)

	const {
		data: commentsData,
		isLoading,
		refetch,
	} = useFindCommentsQuery(ideaId)

	const loadMore = async () => {
		if (flatListRef.current && commentsData) {
			flatListRef.current.scrollToEnd()
		}
		refetch()
	}

	useEffect(() => {
		if (flatListRef.current && commentsData) {
			flatListRef.current.scrollToEnd()
		}
	}, [commentsData])

	if (commentsData && !commentsData.totalCount) {
		return (
			<Container background={theme.colors.backdrop}>
				<CommentsNotFound />
				<CreateCommentForm ideaId={ideaId} />
			</Container>
		)
	}

	return (
		<Container background={theme.colors.backdrop}>
			{isLoading && <LoadingIndicator />}

			<FlatList
				refreshControl={
					<RefreshControl
						tintColor={theme.colors.primary}
						refreshing={isLoading}
						onRefresh={refetch}
					/>
				}
				ref={flatListRef}
				data={commentsData?.comments}
				renderItem={({ item }) => <CommentItem comment={item} />}
				onEndReachedThreshold={0.2}
				onEndReached={() => loadMore()}
			/>

			<CreateCommentForm ideaId={ideaId} />
		</Container>
	)
}

import { useFindCommentsQuery } from '@/entities/comment/api'
import { CommentItem, CommentsNotFound } from '@/entities/comment/ui'
import { IdeaQuery } from '@/entities/idea'
import { CreateCommentForm } from '@/features/comment'
import { ThemeContext } from '@/shared/colors.styled'
import { useContext, useEffect, useRef, useState } from 'react'
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

	const [query, setQuery] = useState<IdeaQuery>({
		page: 1,
		limit: 10,
	})

	const {
		data: commentsData,
		isLoading,
		refetch,
		isFetching,
	} = useFindCommentsQuery({ ideaId, query })

	const loadMore = async () => {
		if (commentsData?.totalCount) {
			if (query.limit < commentsData.totalCount && !isFetching) {
				setQuery(prev => ({
					...prev,
					limit: prev.limit + 10,
				}))
			}
		}

		if (flatListRef.current && commentsData) {
			flatListRef.current.scrollToEnd()
		}
	}

	useEffect(() => {
		if (flatListRef.current && commentsData) {
			flatListRef.current.scrollToEnd()
		}
	}, [commentsData])

	return (
		<Container background={theme.colors.backdrop}>
			{!commentsData?.totalCount ? (
				<CommentsNotFound />
			) : (
				<FlatList
					refreshControl={
						<RefreshControl
							tintColor={theme.colors.primary}
							refreshing={isLoading}
							onRefresh={refetch}
						/>
					}
					ref={flatListRef}
					data={commentsData.comments}
					renderItem={({ item }) => <CommentItem comment={item} />}
					onEndReachedThreshold={0.2}
					onEndReached={loadMore}
					contentContainerStyle={{
						height: 'auto',
						paddingVertical: 20,
						minHeight: '100%',
					}}
				/>
			)}

			<CreateCommentForm ideaId={ideaId} />
		</Container>
	)
}

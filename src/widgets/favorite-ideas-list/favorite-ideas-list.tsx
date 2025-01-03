import { IdeaCard, IdeaQuery, NotFoundFavoriteIdea } from '@/entities/idea'
import { useFindFavoriteIdeasQuery } from '@/entities/idea/api'
import {
	useAddToWishlistMutation,
	useRemoveFromWishlistMutation,
} from '@/entities/wishlist/api'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { useState } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

const IdeasContainer = styled.View<ViewWithThemeProps>`
	background: ${({ theme }) => theme.colors.background};
	padding: 20px 10px;
	width: 100%;
	flex: 1;
`

interface Props {
	navigation: NativeStackNavigationProp<any, any, any>
}

export function FavoriteIdeasList({ navigation }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [query, setQuery] = useState<IdeaQuery>({
		page: 0,
		sortDirection: 'desc',
		limit: 10,
	})

	const {
		data: ideasList,
		isLoading,
		refetch,
	} = useFindFavoriteIdeasQuery(query)
	const [addToWishlist] = useAddToWishlistMutation()
	const [removeFromWishlist] = useRemoveFromWishlistMutation()

	return (
		<>
			<IdeasContainer theme={theme}>
				{isLoading && <LoadingIndicator />}
				{ideasList && (
					<FlatList
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={<NotFoundFavoriteIdea />}
						refreshControl={
							<RefreshControl
								tintColor={theme.colors.primary}
								refreshing={isLoading}
								onRefresh={refetch}
							/>
						}
						refreshing={isLoading}
						data={ideasList}
						renderItem={({ item }) => (
							<IdeaCard
								key={item.id}
								idea={item}
								likeDislikeSlot={
									<LikeDislikeButtons
										id={item.id}
										likes={item.likesCount}
										disLikes={item.dislikesCount}
										reactionType={item.reactionType}
									/>
								}
								wishlistSlot={
									<WishListToggle active={item.isFavorite} ideaId={item.id} />
								}
							/>
						)}
					/>
				)}
			</IdeasContainer>
		</>
	)
}

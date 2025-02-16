import {
	IdeaCard,
	IdeaQuery,
	IdeaStatus,
	NotFoundFavoriteIdea,
	useFindFavoriteIdeasQuery,
} from '@/entities/idea'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { ThemeContext } from '@/shared/colors.styled'
import React, { useContext } from 'react'
import { useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { useAppSelector } from '@/shared/hooks'
import { FilterIdeaStatus } from '@/features/idea'
import { EmptyIdeasList } from '../empty-ideas-list/empty-ideas-list'
import { FlashList } from '@shopify/flash-list'

export function FavoriteIdeasList(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const totalCount = useAppSelector(({ wishlistSlice }) => wishlistSlice.count)

	const [query, setQuery] = useState<IdeaQuery>({
		page: 1,
		limit: 10,
	})

	const onChangeFilterStatus = (status: IdeaStatus | undefined) => {
		setQuery(prevQuery => ({ ...prevQuery, status }))
	}

	const {
		data: ideas,
		isLoading,
		refetch,
		isFetching,
	} = useFindFavoriteIdeasQuery(query)

	const loadMore = () => {
		if (totalCount) {
			if (query.limit < totalCount && !isFetching) {
				setQuery(prev => ({
					...prev,
					limit: prev.limit + 10,
				}))
			}
		}
	}

	if (!totalCount && ideas) {
		return <NotFoundFavoriteIdea />
	}

	return (
		<>
			{ideas && (
				<>
					<FilterIdeaStatus onChangeFilterStatus={onChangeFilterStatus} />
					<View style={{ flex: 1, width: '100%' }}>
						<FlashList
							ListEmptyComponent={<EmptyIdeasList />}
							contentContainerStyle={{
								paddingHorizontal: 10,
								paddingBottom: 60,
								backgroundColor: theme.colors.background,
							}}
							estimatedItemSize={200}
							refreshControl={
								<RefreshControl
									tintColor={theme.colors.primary}
									refreshing={isLoading}
									onRefresh={refetch}
								/>
							}
							refreshing={isLoading}
							data={ideas}
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
										<WishListToggle ideaId={item.id} active={item.isFavorite} />
									}
								/>
							)}
							onEndReached={loadMore}
							onEndReachedThreshold={0.7}
						/>
					</View>
				</>
			)}
		</>
	)
}

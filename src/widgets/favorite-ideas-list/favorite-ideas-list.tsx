import {
	IdeaCard,
	IdeaQuery,
	IdeaStatus,
	NotFoundFavoriteIdea,
} from '@/entities/idea'
import { useFindFavoriteIdeasQuery } from '@/entities/idea/api'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { ThemeContext } from '@/shared/colors.styled'
import React, { useContext } from 'react'
import { useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { FlatList } from 'react-native'
import { useAppSelector } from '@/shared/hooks/hooks'
import { FilterIdeaStatus } from '@/features/idea/filter/filter-status'
import { EmptyIdeasList } from '../empty-ideas-list/empty-ideas-list'

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
					<FlatList
						style={{
							flex: 1,
							paddingHorizontal: 10,
							backgroundColor: theme.colors.background,
						}}
						ListEmptyComponent={<EmptyIdeasList />}
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
						onEndReachedThreshold={0.5}
						ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
						contentContainerStyle={{
							height: 'auto',
							paddingTop: 20,
							paddingBottom: 100,
							minHeight: '100%',
						}}
					/>
				</>
			)}
		</>
	)
}

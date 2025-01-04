import { IdeaCard, IdeaQuery, LocationDepartment } from '@/entities/idea'
import {
	useFindIdeasQuery,
	useFindTotalCountIdeasQuery,
} from '@/entities/idea/api'
import { Filter } from '@/features/idea'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { ThemeContext } from '@/shared/colors.styled'
import React, { memo, useContext } from 'react'
import { useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { FlatList } from 'react-native'
import { EmptyIdeasList } from '../empty-ideas-list/empty-ideas-list'

function BaseIdeasListComponent(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [query, setQuery] = useState<IdeaQuery>({
		page: 1,
		limit: 10,
	})

	const { data: totalCount } = useFindTotalCountIdeasQuery(query)

	const {
		data: ideas,
		isLoading,
		isFetching,
		refetch,
	} = useFindIdeasQuery(query)
	const onChangeFilter = (value: LocationDepartment | undefined) => {
		setQuery(prev => ({ ...prev, department: value }))
	}

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

	return (
		<>
			<Filter onChangeFilter={onChangeFilter} />
			{ideas && (
				<FlatList
					style={{
						flex: 1,
						paddingVertical: 10,
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
				/>
			)}
		</>
	)
}

export const BaseIdeasList = memo(BaseIdeasListComponent)

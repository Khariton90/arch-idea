import { IdeaCard, IdeaQuery } from '@/entities/idea'
import { useFindFavoriteIdeasQuery } from '@/entities/idea/api'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import React, { useContext } from 'react'
import { useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { useAppSelector } from '@/shared/hooks/hooks'

export function FavoriteIdeasList(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const totalCount = useAppSelector(({ wishlistSlice }) => wishlistSlice.count)
	const [query, setQuery] = useState<IdeaQuery>({
		page: 1,
		limit: 10,
	})

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

	return (
		<>
			{ideas && (
				<FlatList
					style={{
						flex: 1,

						paddingHorizontal: 10,
						backgroundColor: theme.colors.background,
					}}
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
						paddingTop: 40,
						paddingBottom: 100,
						minHeight: '100%',
					}}
				/>
			)}
		</>
	)
}

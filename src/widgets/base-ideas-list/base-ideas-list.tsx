import { IdeaCard, setCurrentFilter } from '@/entities/idea'
import {
	useFindIdeasQuery,
	useFindTotalCountIdeasQuery,
} from '@/entities/idea/api'
import { Filter } from '@/features/idea'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { ThemeContext } from '@/shared/colors.styled'
import React, { memo, ReactNode, useContext } from 'react'
import { useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { FlatList } from 'react-native'
import { EmptyIdeasList } from '../empty-ideas-list/empty-ideas-list'
import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks'

interface Props {
	filterSlot: ReactNode
}

function BaseIdeasListComponent({ filterSlot }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const query = useAppSelector(({ ideaSlice }) => ideaSlice.currentFilter)
	const dispatch = useAppDispatch()
	const { data: totalCount = 0 } = useFindTotalCountIdeasQuery(query)

	const {
		data: ideas,
		isLoading,
		isFetching,
		isError,
		refetch,
	} = useFindIdeasQuery(query)

	const loadMore = () => {
		if (query.limit < totalCount && !isFetching) {
			dispatch(
				setCurrentFilter({
					...query,
					limit: query.limit + 10,
				})
			)
		}
	}

	if (isError) {
		return (
			<View>
				<Typography variant='h2' align='center' text={'Произошла ошибка'} />
				<UniversalButton onPress={refetch} title='Попробовать снова' />
			</View>
		)
	}
	return (
		<>
			{filterSlot}
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
					contentContainerStyle={{
						height: 'auto',
						paddingVertical: 20,
						minHeight: '100%',
					}}
				/>
			)}
		</>
	)
}

export const BaseIdeasList = memo(BaseIdeasListComponent)

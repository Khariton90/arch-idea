import { IdeaCard, IdeaQuery, LocationDepartment } from '@/entities/idea'
import { useFindIdeasQuery } from '@/entities/idea/api'
import {
	useAddToWishlistMutation,
	useRemoveFromWishlistMutation,
} from '@/entities/wishlist/api'
import { Filter } from '@/features/idea'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo, useCallback, useContext } from 'react'
import { ReactNode, useState } from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

const IdeasContainer = styled.View<ViewWithThemeProps>`
	gap: 10px;
	background: ${({ theme }) => theme.colors.background};
	padding: 10px;
	border-radius: 20px 20px 0 0;
	flex: 1;
`

interface Props {
	navigation: NativeStackNavigationProp<any, any, any>
	emptySlot: ReactNode
}

const LIMIT = 10
let SKIP = 1

function BaseIdeasListComponent({ navigation, emptySlot }: Props): JSX.Element {
	const dispatch = useAppDispatch()
	const { theme } = useContext(ThemeContext)
	const [query, setQuery] = useState<IdeaQuery>({
		page: 0,
		sortDirection: 'desc',
		limit: LIMIT,
		department: undefined,
	})

	const {
		data: ideasList,
		isLoading,
		isFetching,
		refetch,
	} = useFindIdeasQuery(query)
	const [addToWishlist] = useAddToWishlistMutation()
	const [removeFromWishlist] = useRemoveFromWishlistMutation()

	const loadMore = () => {
		if (isFetching) return
		setQuery(prev => ({
			...prev,
			limit: (SKIP += LIMIT),
		}))
	}

	const onChangeFilter = useCallback(
		(value: LocationDepartment | undefined) => {
			setQuery(prev => ({ ...prev, department: value }))
		},
		[ideasList]
	)

	if (ideasList && !ideasList.length) {
		return (
			<>
				<Filter onChangeFilter={onChangeFilter} />
				<IdeasContainer theme={theme}>{emptySlot}</IdeasContainer>
			</>
		)
	}

	return (
		<>
			<Filter onChangeFilter={onChangeFilter} />
			<IdeasContainer theme={theme}>
				{ideasList && (
					<FlatList
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl
								tintColor={theme.colors.primary}
								refreshing={isLoading}
								onRefresh={refetch}
							/>
						}
						refreshing={isLoading}
						data={ideasList.flat()}
						keyExtractor={(item, index) => String(index)}
						onEndReachedThreshold={0.5}
						onEndReached={() => loadMore()}
						renderItem={({ item }) => (
							<IdeaCard
								navigation={navigation}
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
									<WishListToggle
										active={item.isFavorite}
										add={() => addToWishlist({ id: item.id })}
										remove={() => removeFromWishlist({ id: item.id })}
									/>
								}
							/>
						)}
					/>
				)}

				{isFetching && (
					<ActivityIndicator color={theme.colors.primary} size={'small'} />
				)}
			</IdeasContainer>
		</>
	)
}

export const BaseIdeasList = memo(BaseIdeasListComponent)

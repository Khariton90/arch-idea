import { IdeaCard, IdeaQuery, NotFoundMainIdea } from '@/entities/idea'
import { useFindMyIdeasQuery } from '@/entities/idea/api'
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
`

interface Props {
	navigation: NativeStackNavigationProp<any, any, any>
}

export function MyIdeasList({ navigation }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [query, setQuery] = useState<IdeaQuery>({
		page: 0,
		sortDirection: 'desc',
		limit: 10,
	})

	const {
		data: ideasList,
		isLoading,
		error,
		isSuccess,
		refetch,
	} = useFindMyIdeasQuery(query)
	const [addToWishlist] = useAddToWishlistMutation()
	const [removeFromWishlist] = useRemoveFromWishlistMutation()

	if (ideasList && !ideasList.length) {
		return <NotFoundMainIdea />
	}

	return (
		<>
			<IdeasContainer theme={theme}>
				{isLoading && <LoadingIndicator />}
				{ideasList && (
					<FlatList
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl refreshing={isLoading} onRefresh={refetch} />
						}
						refreshing={isLoading}
						data={ideasList}
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
			</IdeasContainer>
		</>
	)
}

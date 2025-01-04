import { IdeaCard, IdeaQuery, NotFoundMainIdea } from '@/entities/idea'
import { useFindMyIdeasQuery } from '@/entities/idea/api'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks/hooks'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { useState } from 'react'
import { RefreshControl, View } from 'react-native'
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

export function MyIdeasList({ navigation }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const totalCount = useAppSelector(({ ideaSlice }) => ideaSlice.myIdeasCount)

	const [query, setQuery] = useState<IdeaQuery>({
		page: 0,
		sortDirection: 'desc',
		limit: 10,
	})

	const {
		data: ideas,
		isLoading,
		isFetching,
		refetch,
	} = useFindMyIdeasQuery(query)

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
			<IdeasContainer theme={theme}>
				{ideas && (
					<FlatList
						style={{
							flex: 1,
							paddingVertical: 10,
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
					/>
				)}
			</IdeasContainer>
		</>
	)
}

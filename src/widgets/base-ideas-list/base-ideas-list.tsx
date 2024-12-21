import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { IdeaCard, IdeaQuery, IdeaStatus } from '@/entities/idea'
import { useFindIdeasQuery } from '@/entities/idea/api'
import {
	useAddToWishlistMutation,
	useRemoveFromWishlistMutation,
} from '@/entities/wishlist/api'
import { LikeDislikeButtons } from '@/features/vote'
import { WishListToggle } from '@/features/wishlist'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ReactNode, useState } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

const ErrorText = styled.Text`
	text-align: center;
	color: ${Colors.white};
	font-size: 18px;
`

const IdeasContainer = styled.View`
	flex: 1;
	gap: 20px;
	background: ${Colors.lightGrey};
	padding: 20px;
	border-radius: ${Root.radius20} ${Root.radius20} 0 0;
`

interface Props {
	queryFilter: IdeaStatus | string
	navigation: NativeStackNavigationProp<any, any, any>
	emptySlot: ReactNode
}

export function BaseIdeasList({
	queryFilter,
	navigation,
	emptySlot,
}: Props): JSX.Element {
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
	} = useFindIdeasQuery(query)
	const [addToWishlist] = useAddToWishlistMutation()
	const [removeFromWishlist] = useRemoveFromWishlistMutation()

	return (
		<IdeasContainer>
			<FlatList
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
							<LikeDislikeButtons id={item.id} likes={2} disLakes={2} />
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
			></FlatList>
		</IdeasContainer>
	)
}

import { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { IdeaDetailsCard } from '@/entities/idea'
import { LikeDislikeButtons } from '@/features/vote'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import { useFindByIdeaIdQuery } from '@/entities/idea/api'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { WishListToggle } from '@/features/wishlist'

import {
	useAddToWishlistMutation,
	useRemoveFromWishlistMutation,
} from '@/entities/wishlist/api'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
`

export function IdeaDetailsPage({ route }: any): JSX.Element {
	const { id, likes, disLakes, isFavorite } = route.params

	const [removeFromWishlist] = useRemoveFromWishlistMutation()
	const [addToWishlist] = useAddToWishlistMutation()
	const { data: idea, isLoading, refetch } = useFindByIdeaIdQuery(id)

	const handleAddToWishlist = async () => {
		if (idea) {
			await addToWishlist({ id: idea.id })
			await refetch()
		}
	}

	const handleRemoveFromWishlist = async () => {
		if (idea) {
			await removeFromWishlist({ id: idea.id })
			await refetch()
		}
	}

	useEffect(() => {
		refetch()
	}, [isFavorite])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				{isLoading && <LoadingIndicator />}
				{idea && (
					<Container>
						<IdeaDetailsCard
							id={idea.id}
							title={idea.title}
							likesDisLakesSlot={
								<LikeDislikeButtons id={id} likes={likes} disLakes={disLakes} />
							}
							wishListSlot={
								<WishListToggle
									active={idea.isFavorite}
									add={handleAddToWishlist}
									remove={handleRemoveFromWishlist}
								/>
							}
						/>
					</Container>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

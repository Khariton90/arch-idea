import { useEffect } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { IdeaDetailsCard } from '@/entities/idea'
import { LikeDislikeButtons } from '@/features/vote'
import { useFindByIdeaIdQuery } from '@/entities/idea/api'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { WishListToggle } from '@/features/wishlist'
import {
	useAddToWishlistMutation,
	useRemoveFromWishlistMutation,
} from '@/entities/wishlist/api'
import { ButtonToComments } from '@/entities/comment'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'

type Props = {
	route: RouteProp<RootStackParamList, AppRoutes.IdeaDetailsPage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function IdeaDetailsPage({ route, navigation }: Props): JSX.Element {
	const { id, isFavorite, title } = route.params
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

	const onRefetch = async () => {
		await refetch()
	}

	useEffect(() => {
		navigation.setOptions({
			title,
		})
	})

	useEffect(() => {
		refetch()
	}, [isFavorite])

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				{isLoading && <LoadingIndicator />}
				{idea && (
					<IdeaDetailsCard
						idea={idea}
						likesDisLakesSlot={
							<LikeDislikeButtons
								reactionType={idea.reactionType}
								id={id}
								likes={idea.likesCount}
								disLikes={idea.dislikesCount}
								onRefetch={onRefetch}
							/>
						}
						wishListSlot={
							<WishListToggle
								active={idea.isFavorite}
								add={handleAddToWishlist}
								remove={handleRemoveFromWishlist}
							/>
						}
						commentsSlot={
							<ButtonToComments
								onPress={() =>
									navigation.navigate(AppRoutes.CommentsPage, { id })
								}
							/>
						}
					/>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

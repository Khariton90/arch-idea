import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { IdeaDetailsCard } from '@/entities/idea'
import { LikeDislikeButtons } from '@/features/vote'
import { useFindByIdeaIdQuery } from '@/entities/idea/api'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { WishListToggle } from '@/features/wishlist'
import { ButtonToComments } from '@/entities/comment'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import {
	GestureHandlerRootView,
	RefreshControl,
} from 'react-native-gesture-handler'
import { ThemeContext } from '@/shared/colors.styled'
import { delay } from '@/shared/lib/delay'
import React from 'react'

const TITLE_LENGTH = 12

type Props = {
	route: RouteProp<RootStackParamList, AppRoutes.IdeaDetailsPage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function IdeaDetailsPage({ route, navigation }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [isLoading, setIsLoading] = useState(false)

	const { id, isFavorite, title } = route.params
	const { data: idea, refetch, isFetching } = useFindByIdeaIdQuery(id)

	const fetchData = async () => {
		setIsLoading(() => true)
		await refetch()
		await delay()
		setIsLoading(() => false)
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title:
				title.length > TITLE_LENGTH
					? `${title.slice(0, TITLE_LENGTH)}...`
					: title,
		})
	})

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<GestureHandlerRootView>
				<ScrollView
					contentContainerStyle={{ flex: 1 }}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={isFetching}
							tintColor={theme.colors.primary}
							onRefresh={fetchData}
						/>
					}
				>
					{isLoading ? (
						<LoadingIndicator />
					) : (
						<>
							{idea && (
								<IdeaDetailsCard
									idea={idea}
									likesDisLakesSlot={
										<LikeDislikeButtons
											refetch={fetchData}
											reactionType={idea.reactionType}
											id={id}
											likes={idea.likesCount}
											disLikes={idea.dislikesCount}
										/>
									}
									wishListSlot={
										<WishListToggle
											refetch={fetchData}
											active={idea.isFavorite}
											ideaId={idea.id}
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
						</>
					)}
				</ScrollView>
			</GestureHandlerRootView>
		</SafeAreaView>
	)
}

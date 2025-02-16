import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { IdeaDetailsCard, useFindByIdeaIdQuery } from '@/entities/idea'
import { LikeDislikeButtons } from '@/features/vote'
import { LoadingIndicator } from '@/shared/ui'
import { WishListToggle } from '@/features/wishlist'
import { ButtonToComments } from '@/entities/comment'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppRoutes, RootStackParamList } from '@/shared/model'
import { RefreshControl } from 'react-native-gesture-handler'
import { ThemeContext } from '@/shared/colors.styled'
import { delay } from '@/shared/lib'
import { CreateSolutionAboutIdea } from '@/features/idea'

const PAGE_TITLE_LENGTH = 12

type Props = {
	route: RouteProp<RootStackParamList, AppRoutes.IdeaDetailsPage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function IdeaDetailsPage({ route, navigation }: Props): JSX.Element {
	const { id, title } = route.params
	const { theme } = useContext(ThemeContext)
	const [isLoading, setIsLoading] = useState(false)
	const { data: idea, refetch, isFetching } = useFindByIdeaIdQuery(id)

	const fetchData = async () => {
		setIsLoading(() => true)
		await refetch()
		await delay()
		setIsLoading(() => false)
	}

	const navigateToCommentsOnIdeaId = (id: string) => {
		navigation.navigate(AppRoutes.CommentsPage, { id })
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title:
				title.length > PAGE_TITLE_LENGTH
					? `${title.slice(0, PAGE_TITLE_LENGTH)}...`
					: title,
		})
	})

	useEffect(() => {
		fetchData()
	}, [])

	if (isLoading || !idea) {
		return (
			<SafeAreaView
				style={{ flex: 1, backgroundColor: theme.colors.background }}
			>
				<LoadingIndicator />
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<ScrollView
				contentContainerStyle={{
					...styles.container,
				}}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={isFetching}
						tintColor={theme.colors.primary}
						onRefresh={fetchData}
					/>
				}
			>
				<IdeaDetailsCard
					refetch={fetchData}
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
							ideaId={idea.id}
							onPress={() => navigateToCommentsOnIdeaId(id)}
						/>
					}
					solutionSlot={
						<CreateSolutionAboutIdea id={idea.id} fetchData={fetchData} />
					}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 80,
		minHeight: '100%',
	},
})

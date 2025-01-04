import { NotFoundFavoriteIdea, NotFoundMainIdea } from '@/entities/idea'
import { ThemeContext } from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks/hooks'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { FavoriteIdeasList } from '@/widgets/favorite-ideas-list/favorite-ideas-list'
import { MyIdeasList } from '@/widgets/my-ideas-list/my-ideas-list'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContext, useEffect } from 'react'
import styled from 'styled-components/native'

const Container = styled.View<{ background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	justify-content: center;
	align-items: center;
	width: 100%;
`

type Props = {
	route: RouteProp<RootStackParamList, AppRoutes.ProfileIdeasPage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function ProfileIdeasPage({ route, navigation }: Props): JSX.Element {
	const { title, page } = route.params
	const { theme } = useContext(ThemeContext)

	const totalMyIdeasCount = useAppSelector(
		({ ideaSlice }) => ideaSlice.myIdeasCount
	)

	const totalWishlistCount = useAppSelector(
		({ wishlistSlice }) => wishlistSlice.count
	)

	useEffect(() => {
		navigation.setOptions({
			title,
		})
	})

	if (page === 'Favorite') {
		return (
			<Container background={theme.colors.backdrop}>
				{totalWishlistCount ? (
					<FavoriteIdeasList navigation={navigation} />
				) : (
					<NotFoundFavoriteIdea />
				)}
			</Container>
		)
	}
	return (
		<Container background={theme.colors.backdrop}>
			{totalMyIdeasCount ? (
				<MyIdeasList navigation={navigation} />
			) : (
				<NotFoundMainIdea />
			)}
		</Container>
	)
}

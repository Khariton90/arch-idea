import {
	IdeaQuery,
	NotFoundFavoriteIdea,
	NotFoundMainIdea,
} from '@/entities/idea'
import { useFindMyIdeasQuery } from '@/entities/idea/api'
import { ThemeContext } from '@/shared/colors.styled'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { BaseIdeasList, EmptyIdeasList } from '@/widgets'
import { FavoriteIdeasList } from '@/widgets/favorite-ideas-list/favorite-ideas-list'
import { MyIdeasList } from '@/widgets/my-ideas-list/my-ideas-list'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContext, useEffect, useState } from 'react'
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

	useEffect(() => {
		navigation.setOptions({
			title,
		})
	})

	if (page === 'Favorite') {
		return (
			<Container background={theme.colors.backdrop}>
				<FavoriteIdeasList navigation={navigation} />
			</Container>
		)
	}
	return (
		<Container background={theme.colors.backdrop}>
			<MyIdeasList navigation={navigation} />
		</Container>
	)
}

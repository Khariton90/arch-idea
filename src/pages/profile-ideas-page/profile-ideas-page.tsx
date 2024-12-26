import { NotFoundFavoriteIdea, NotFoundMainIdea } from '@/entities/idea'
import { ThemeContext } from '@/shared/colors.styled'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContext, useEffect } from 'react'
import styled from 'styled-components/native'

const Container = styled.View<{ background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	justify-content: center;
	align-items: center;
`

type Props = {
	route: RouteProp<RootStackParamList, AppRoutes.ProfileIdeasPage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function ProfileIdeasPage({ route, navigation }: Props): JSX.Element {
	const { title } = route.params
	const { theme } = useContext(ThemeContext)

	useEffect(() => {
		navigation.setOptions({
			title,
		})
	})

	return (
		<Container background={theme.colors.backdrop}>
			{title === 'Избранное' ? <NotFoundFavoriteIdea /> : <NotFoundMainIdea />}
		</Container>
	)
}

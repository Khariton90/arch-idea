import { ThemeContext } from '@/shared/colors.styled'
import { AppRoutes, RootStackParamList } from '@/shared/model'
import { delay } from '@/shared/lib'
import { LoadingIndicator } from '@/shared/ui'
import { MyIdeasList, FavoriteIdeasList } from '@/widgets'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContext, useLayoutEffect, useState } from 'react'
import styled from 'styled-components/native'

const Container = styled.View<{ background: string }>`
	background-color: ${({ background }) => background};
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100%;
	flex: 1;
	padding-top: 20px;
`

type Props = {
	route: RouteProp<RootStackParamList, AppRoutes.ProfileIdeasPage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function ProfileIdeasPage({ route, navigation }: Props): JSX.Element {
	const { title, page } = route.params
	const { theme } = useContext(ThemeContext)
	const [isLoading, setIsLoading] = useState(true)

	const delayLoader = async () => {
		await delay(1000)
		setIsLoading(false)
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title,
		})

		delayLoader()
	})

	if (isLoading) {
		return <LoadingIndicator />
	}

	if (page === 'Favorite') {
		return (
			<Container background={theme.colors.background}>
				<FavoriteIdeasList />
			</Container>
		)
	}

	return (
		<Container background={theme.colors.background}>
			<MyIdeasList />
		</Container>
	)
}

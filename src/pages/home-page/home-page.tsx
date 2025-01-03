import { AddNewIdeaButton } from '@/features/idea'
import { BaseIdeasList, LayoutHeader, LayoutLogo } from '@/widgets'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { ThemeContext } from '@/shared/colors.styled'
import { useGetAccountQuery } from '@/entities/session/api'

const Main = styled.View`
	gap: 10px;
	flex: 1;
`

interface Props {
	route: RouteProp<RootStackParamList, AppRoutes.HomePage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function HomePage({ navigation }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const { data } = useGetAccountQuery()

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.backdrop }}>
			<Main>
				{data && (
					<>
						<LayoutHeader />
						<LayoutLogo />
						<AddNewIdeaButton />
						<BaseIdeasList />
					</>
				)}
			</Main>
		</SafeAreaView>
	)
}

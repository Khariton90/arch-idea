import { IdeaStatus, setMyIdeasCount } from '@/entities/idea'
import { AddNewIdeaButton } from '@/features/idea'
import {
	BaseIdeasList,
	EmptyIdeasList,
	LayoutHeader,
	LayoutLogo,
} from '@/widgets'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { ThemeContext } from '@/shared/colors.styled'
import { useAccountQuery } from '@/entities/session/api'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { setUserId } from '@/entities/session/model/slice'
import { setWishlistCount } from '@/entities/wishlist/model/slice'
import { setUserFullName } from '@/entities/user/model/slice'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'

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

	const { data: account, isLoading, isSuccess } = useAccountQuery()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (account) {
			dispatch(setUserId(account.id))
			dispatch(setWishlistCount(account.favoriteIdeasCount))
			dispatch(setMyIdeasCount(account.myIdeasCount))
			dispatch(
				setUserFullName({
					firstName: account.firstName,
					lastName: account.lastName,
				})
			)
		}
	}, [account])

	if (isLoading) {
		return <LoadingIndicator />
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.backdrop }}>
			<Main>
				<LayoutHeader navigation={navigation} />
				<LayoutLogo />
				<AddNewIdeaButton navigation={navigation} />
				<BaseIdeasList emptySlot={<EmptyIdeasList />} navigation={navigation} />
			</Main>
		</SafeAreaView>
	)
}

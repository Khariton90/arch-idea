import Colors from '@/app/styles/Colors'
import { IdeaStatus, setMyIdeasCount } from '@/entities/idea'
import { useAccountQuery } from '@/entities/session/api'
import { setUserId } from '@/entities/session/model/slice'
import { setWishlistCount } from '@/entities/wishlist/model/slice'
import { AddNewIdeaButton, Filter } from '@/features/idea'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
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
import { setUserFullName } from '@/entities/user/model/slice'

const Main = styled.View`
	gap: 10px;
	flex: 1;
`

interface Props {
	route: RouteProp<RootStackParamList, AppRoutes.HomePage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function HomePage({ navigation }: Props): JSX.Element {
	const [queryFilter, setQueryFilter] = useState<IdeaStatus | string>('')
	const { data: account, isLoading, isSuccess } = useAccountQuery()
	const dispatch = useAppDispatch()

	const { theme } = useContext(ThemeContext)

	const onPressFilter = (query: IdeaStatus) => {
		if (query === queryFilter) {
			setQueryFilter(state => '')
			return
		}

		setQueryFilter(state => query)
	}

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
				<BaseIdeasList
					emptySlot={<EmptyIdeasList />}
					queryFilter={queryFilter}
					navigation={navigation}
				/>
			</Main>
		</SafeAreaView>
	)
}

import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
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
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import React from 'react'

const Main = styled.View`
	gap: 10px;
	flex: 1;
`

interface Props {
	navigation: NativeStackNavigationProp<any, any, any>
}

export function HomePage({ navigation }: Props): JSX.Element {
	const [queryFilter, setQueryFilter] = useState<IdeaStatus | string>('')
	const { data: account, isLoading, isSuccess } = useAccountQuery()
	const dispatch = useAppDispatch()

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
		}
	}, [account])

	if (isLoading) {
		return <LoadingIndicator />
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
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

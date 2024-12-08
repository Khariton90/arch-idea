import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { IdeaStatus } from '@/entities/idea'
import { AddNewIdeaButton, Filter } from '@/features/idea'
import {
	BaseIdeasList,
	LayoutLogo,
	EmptyIdeasList,
	LayoutHeader,
} from '@/widgets'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
`

const Main = styled.View`
	gap: 20px;
	flex: 1;
`

const IdeasContainer = styled.View`
	flex: 1;
	gap: 20px;
	background: ${Colors.lightGrey};
	padding: 20px;
	border-radius: ${Root.radius20} ${Root.radius20} 0 0;
	margin-top: 20px;
`

interface Props {
	navigation: NativeStackNavigationProp<any, any, any>
}

export function HomePage({ navigation }: Props): JSX.Element {
	const [queryFilter, setQueryFilter] = useState<IdeaStatus | string>('')

	const onPressFilter = (query: IdeaStatus) => {
		if (query === queryFilter) {
			setQueryFilter(state => '')
			return
		}

		setQueryFilter(state => query)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Container>
					<LayoutHeader />
					<Main>
						<LayoutLogo />
						<AddNewIdeaButton navigation={navigation} />
						<IdeasContainer>
							<Filter onPressFilter={onPressFilter} queryFilter={queryFilter} />
							<BaseIdeasList
								emptySlot={<EmptyIdeasList />}
								queryFilter={queryFilter}
								navigation={navigation}
							/>
						</IdeasContainer>
					</Main>
				</Container>
			</ScrollView>
		</SafeAreaView>
	)
}

import { useEffect } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { IdeaDetailsCard } from '@/entities/idea'
import { LikeDislikeButtons } from '@/features/vote'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
`

export function IdeaDetailsPage({ route, navigation }: any): JSX.Element {
	const { title, id, likes, disLakes } = route.params

	useEffect(() => {
		navigation.setOptions({
			title,
		})
	})
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Container>
					<IdeaDetailsCard
						title={title}
						id={id}
						likesDisLakesSlot={
							<LikeDislikeButtons id={id} likes={likes} disLakes={disLakes} />
						}
					/>
				</Container>
			</ScrollView>
		</SafeAreaView>
	)
}

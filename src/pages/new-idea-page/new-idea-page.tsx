import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import { NewIdeaForm } from '@/widgets/new-idea-form/new-idea-form'
import { SafeAreaView, ScrollView } from 'react-native'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
	align-items: center;
	justify-content: center;
	padding: 20px;
`

export function NewIdeaPage({ route }: any): JSX.Element {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Container>
					<NewIdeaForm />
				</Container>
			</ScrollView>
		</SafeAreaView>
	)
}

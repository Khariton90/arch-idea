import { NewIdeaForm } from '@/widgets/new-idea-form/new-idea-form'
import { SafeAreaView, ScrollView } from 'react-native'

export function NewIdeaPage({ route }: any): JSX.Element {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<NewIdeaForm />
			</ScrollView>
		</SafeAreaView>
	)
}

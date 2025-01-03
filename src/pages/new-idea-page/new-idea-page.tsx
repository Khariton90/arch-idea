import { NewIdeaForm } from '@/widgets/new-idea-form/new-idea-form'
import { SafeAreaView, ScrollView } from 'react-native'

export function NewIdeaPage(): JSX.Element {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<NewIdeaForm />
			</ScrollView>
		</SafeAreaView>
	)
}

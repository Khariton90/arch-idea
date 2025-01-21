import { ThemeContext } from '@/shared/colors.styled'
import { LayoutLogo, NewIdeaForm } from '@/widgets'
import { useContext } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

export function NewIdeaPage(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.backdrop }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<NewIdeaForm slotWithLogo={<LayoutLogo />} />
			</ScrollView>
		</SafeAreaView>
	)
}

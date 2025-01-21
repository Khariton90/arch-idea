import { ThemeContext } from '@/shared/colors.styled'
import { UserList } from '@/widgets'
import { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function DashboardPage() {
	const { theme } = useContext(ThemeContext)

	return (
		<SafeAreaView style={{ ...styles, backgroundColor: theme.colors.backdrop }}>
			<UserList />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20,
		paddingHorizontal: 10,
	},
})

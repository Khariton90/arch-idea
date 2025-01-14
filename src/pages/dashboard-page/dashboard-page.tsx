import { ThemeContext } from '@/shared/colors.styled'
import { UserList } from '@/widgets/user-list/user-list'
import React from 'react'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export function DashboardPage() {
	const { theme } = useContext(ThemeContext)

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: theme.colors.backdrop,
				justifyContent: 'center',
				alignItems: 'center',
				paddingVertical: 20,
				paddingHorizontal: 10,
			}}
		>
			<UserList />
		</SafeAreaView>
	)
}

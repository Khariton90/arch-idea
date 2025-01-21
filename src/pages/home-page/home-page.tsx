import { AddNewIdeaButton } from '@/features/idea'
import { BaseIdeasList, LayoutHeader, LayoutLogo } from '@/widgets'
import { useContext } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ThemeContext } from '@/shared/colors.styled'
import { useGetAccountQuery } from '@/entities/session/api'
import { LoadingIndicator } from '@/shared/ui'

export function HomePage(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const { data: account, isLoading } = useGetAccountQuery()

	if (isLoading || !account) {
		return <LoadingIndicator />
	}

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: theme.colors.backdrop }}
		>
			<LayoutHeader />
			<LayoutLogo />
			<AddNewIdeaButton />
			<BaseIdeasList />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
	},
})

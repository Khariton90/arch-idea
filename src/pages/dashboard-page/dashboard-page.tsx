import { Typography } from '@/shared/ui/typography/typography'
import { SafeAreaView } from 'react-native-safe-area-context'

export function DashboardPage() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Typography variant='h1' text='Dashboard Page' />
		</SafeAreaView>
	)
}

import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { CommentsList } from '@/widgets/comments-list/comments-list'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native'

type Props = {
	route: RouteProp<RootStackParamList, AppRoutes.CommentsPage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function CommentsPage({ navigation, route }: Props): JSX.Element {
	const ideId = route.params.id

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<CommentsList ideaId={ideId} />
		</SafeAreaView>
	)
}

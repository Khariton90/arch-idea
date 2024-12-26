import { useFindCommentsQuery } from '@/entities/comment/api'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
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
	const { data: comments, isLoading } = useFindCommentsQuery(ideId)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{isLoading && <LoadingIndicator />}
			{comments && <CommentsList commentData={comments} ideaId={ideId} />}
		</SafeAreaView>
	)
}

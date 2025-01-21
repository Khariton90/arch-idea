import { AppRoutes, RootStackParamList } from '@/shared/model'
import { CommentsList } from '@/widgets'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native'

type Props = {
	route: RouteProp<RootStackParamList, AppRoutes.CommentsPage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

export function CommentsPage({ navigation, route }: Props): JSX.Element {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<CommentsList ideaId={route.params.id} />
		</SafeAreaView>
	)
}

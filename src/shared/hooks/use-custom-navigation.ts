import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../model/types'

type ScreenName = keyof RootStackParamList

function useCustomNavigation() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>()

	const navigate = (screen: ScreenName, params?: any) => {
		navigation.navigate(screen, params || {})
	}

	return { navigate }
}

export default useCustomNavigation

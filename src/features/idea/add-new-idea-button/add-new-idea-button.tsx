import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import { AppRoutes } from '@/shared/model/types'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'

const Box = styled.View`
	flex-direction: row;
	justify-content: center;
	padding: 0 20px;
`

interface Props {
	navigation: NativeStackNavigationProp<any, any, any>
}

export function AddNewIdeaButton({ navigation }: Props): JSX.Element {
	return (
		<Box>
			<UniversalButton
				fullWidth
				onPress={() => navigation.navigate(AppRoutes.NewIdeaPage)}
				title='Добавить новую идею'
			/>
		</Box>
	)
}

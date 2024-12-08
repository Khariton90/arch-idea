import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'

const Box = styled.View`
	flex-direction: row;
	padding: 0 20px;
`

const Button = styled.TouchableOpacity`
	flex: 1;
	color: #fff;
	padding: 20px;
	background-color: ${Colors.success};
	border-radius: ${Root.radius10};
	box-shadow: 0px 2px 6px ${Colors.lightGrey};
`

const Text = styled.Text`
	color: #fff;
	text-align: center;
	text-transform: uppercase;
`

interface Props {
	navigation: NativeStackNavigationProp<any, any, any>
}

export function AddNewIdeaButton({ navigation }: Props): JSX.Element {
	return (
		<Box>
			<Button onPress={() => navigation.navigate('New')}>
				<Text>Добавить новую идею</Text>
			</Button>
		</Box>
	)
}

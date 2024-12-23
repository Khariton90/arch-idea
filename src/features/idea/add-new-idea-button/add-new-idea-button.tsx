import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { AppRoutes } from '@/shared/model/types'
import { useContext } from 'react'
import {
	TextWithThemeProps,
	ThemeContext,
	TouchableOpacityWithThemeProps,
} from '@/shared/colors.styled'

const Box = styled.View`
	flex-direction: row;
	padding: 0 20px;
`

const Button = styled.TouchableOpacity<TouchableOpacityWithThemeProps>`
	flex: 1;
	color: #fff;
	padding: 18px;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: ${Root.radius10};
	box-shadow: 0px 2px 6px ${Colors.lightGrey};
`

const Text = styled.Text<TextWithThemeProps>`
	color: ${({ theme }) => theme.colors.background};
	text-align: center;
	text-transform: uppercase;
`

interface Props {
	navigation: NativeStackNavigationProp<any, any, any>
}

export function AddNewIdeaButton({ navigation }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	return (
		<Box>
			<Button
				theme={theme}
				onPress={() => navigation.navigate(AppRoutes.NewIdeaPage)}
			>
				<Text theme={theme}>Добавить новую идею</Text>
			</Button>
		</Box>
	)
}

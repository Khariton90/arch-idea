import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { AppRoutes, RootStackParamList } from '@/shared/model/types'
import { LampIcon } from '@/shared/ui/lamp-icon'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { Dimensions, Image } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import styled from 'styled-components/native'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
	justify-content: center;
	align-items: center;
`

const ImageBlock = styled.View<ViewProps>`
	height: 400px;
	background-color: ${Colors.lightGrey};
	justify-content: center;
	align-items: center;
	border-radius: ${Root.radius20};
	gap: ${Root.gap20};
`

const TextTitle = styled.Text`
	font-size: 20px;
	font-weight: 600;
	color: ${Colors.success};
	text-transform: uppercase;
`

type Props = {
	route: RouteProp<RootStackParamList, AppRoutes.ProfileIdeasPage>
	navigation: NativeStackNavigationProp<RootStackParamList>
}

const width = Dimensions.get('window').width - 20

export function ProfileIdeasPage({ route, navigation }: Props): JSX.Element {
	const { title } = route.params

	useEffect(() => {
		navigation.setOptions({
			title,
		})
	})

	return (
		<Container>
			<ImageBlock style={{ width }}>
				<LampIcon />
				<TextTitle>В разработке</TextTitle>
			</ImageBlock>
		</Container>
	)
}

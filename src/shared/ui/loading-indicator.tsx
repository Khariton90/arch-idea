import Colors from '@/app/styles/Colors'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
	justify-content: center;
	align-items: center;
`

export function LoadingIndicator(): JSX.Element {
	return (
		<Container>
			<ActivityIndicator size={'large'} color={Colors.success} />
		</Container>
	)
}

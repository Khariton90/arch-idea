import Colors from '@/app/styles/Colors'
import styled from 'styled-components/native'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
`

export function ProfilePage(): JSX.Element {
	return <Container></Container>
}

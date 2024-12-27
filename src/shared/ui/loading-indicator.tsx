import { useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import { ThemeContext } from '../colors.styled'

const Container = styled.View<{ background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	justify-content: center;
	align-items: center;
`

export function LoadingIndicator(): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<Container background={theme.colors.background}>
			<ActivityIndicator size={'large'} color={theme.colors.accent} />
		</Container>
	)
}

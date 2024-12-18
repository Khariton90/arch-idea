import Colors from '@/app/styles/Colors'
import styled from 'styled-components/native'

type ChipTheme = 'primary' | 'success'

const Container = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	background-color: ${Colors.success};
	border-radius: 16px;
	height: 30px;
`

const ChipText = styled.Text`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 0 12px;
	font-size: 12px;
	color: ${Colors.white};
`

interface Props {
	title: string
	theme?: ChipTheme
}

export function Chip({ title, theme = 'primary' }: Props): JSX.Element {
	return (
		<Container>
			<ChipText>{title}</ChipText>
		</Container>
	)
}

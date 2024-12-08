import styled from 'styled-components/native'

const Box = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

const Title = styled.Text`
	font-size: 24px;
	color: #fff;
	margin-bottom: 20px;
`

const SubTitle = styled.Text`
	font-size: 14px;
	color: #fff;
	margin-bottom: 30px;
`

export function EmptyIdeasList(): JSX.Element {
	return (
		<Box>
			<Title>Пока здесь пусто...</Title>
			<SubTitle>Будьте первым, кто предложит идею!</SubTitle>
		</Box>
	)
}

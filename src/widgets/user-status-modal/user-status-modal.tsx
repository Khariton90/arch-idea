import { TextProps } from 'react-native'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import styled from 'styled-components/native'

const Container = styled.View`
	margin: 10px 0;
	gap: 10px;
	padding: 10px;
`

const Row = styled.View<ViewProps & { border?: boolean }>`
	flex-direction: row;
	justify-content: space-between;
	padding: 0 10px;
	border-bottom-width: ${({ border }) => (border ? '1px' : '0px')};
	border-bottom-color: #ccc;
`

const Title = styled.Text<TextProps>`
	font-size: 16px;
	color: #fff;
	padding-bottom: 6px;
`

const DescriptionBox = styled.View`
	padding: 20px 10px;
	border-radius: 10px;
`

interface Props {
	color: string
	background: string
}

export function UserStatusModal({ color, background }: Props): JSX.Element {
	return (
		<Container>
			<Row>
				<Title style={{ color: color, fontWeight: 600 }}>Ваш статус</Title>
				<Title style={{ color: color, fontWeight: 600 }}>Спец</Title>
			</Row>

			<DescriptionBox style={{ backgroundColor: background }}>
				<Title style={{ color: color }}>Старайтесь держать активность</Title>
				<Title style={{ color: color }}>
					Завершённые идеи повышают ваш статус, когда проект или задание
					полностью выполнены и готовы к использованию.
				</Title>
				<Title style={{ color: color }}>
					После завершения идеи переходят в стадию внедрения, где они начинают
					приносить пользу.
				</Title>
			</DescriptionBox>

			<Row border>
				<Title style={{ color: color }}>Спец</Title>
				<Title style={{ color: color }}>0 идей</Title>
			</Row>

			<Row border>
				<Title style={{ color: color }}>Мастер</Title>
				<Title style={{ color: color }}>20 идей</Title>
			</Row>

			<Row border>
				<Title style={{ color: color }}>Профи</Title>
				<Title style={{ color: color }}>30 идей</Title>
			</Row>

			<Row border>
				<Title style={{ color: color }}>Эксперт</Title>
				<Title style={{ color: color }}>40 идей</Title>
			</Row>

			<Row>
				<Title style={{ color: color }}>Супер-эксперт</Title>
				<Title style={{ color: color }}>50 идей</Title>
			</Row>
		</Container>
	)
}

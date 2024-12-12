import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { IdeaStatus } from '@/entities/idea'
import { Dimensions, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

const FilterList = styled.View`
	flex-direction: row;
	gap: 10px;
	justify-content: space-between;
	padding: 10px 0 20px;
`

const FilterItem = styled.TouchableOpacity<
	TouchableOpacityProps & {
		background?: string
		width: string
	}
>`
	background-color: ${Colors.background};
	padding: 6px;
	border-radius: ${Root.radius10};
	justify-content: center;
	align-items: center;
	width: ${({ width }) => width};
`

const FilterItemText = styled.Text`
	color: ${Colors.white};
	text-align: center;
	font-size: 10px;
`

interface Props {
	onPressFilter: (query: IdeaStatus) => void
	queryFilter: IdeaStatus | string
}

export function Filter({ onPressFilter, queryFilter }: Props): JSX.Element {
	const handlePress = (query: IdeaStatus) => {
		onPressFilter(query)
	}

	const width = Dimensions.get('window').width
	const smallBtnWidth = Math.ceil(width / 4 - 20)
	const widthValue = `${smallBtnWidth}px`

	return (
		<FilterList>
			<FilterItem
				background={Colors.success}
				width={widthValue}
				onPress={() => handlePress(IdeaStatus.New)}
			>
				<FilterItemText>Новые</FilterItemText>
			</FilterItem>

			<FilterItem
				background={Colors.primary}
				width={widthValue}
				onPress={() => handlePress(IdeaStatus.InProgress)}
			>
				<FilterItemText>В работе</FilterItemText>
			</FilterItem>

			<FilterItem
				background={Colors.alert}
				width={widthValue}
				onPress={() => handlePress(IdeaStatus.Completed)}
			>
				<FilterItemText>Завершены</FilterItemText>
			</FilterItem>

			<FilterItem
				background={Colors.alert}
				width={widthValue}
				onPress={() => handlePress(IdeaStatus.Canceled)}
			>
				<FilterItemText>Отменены</FilterItemText>
			</FilterItem>
		</FilterList>
	)
}

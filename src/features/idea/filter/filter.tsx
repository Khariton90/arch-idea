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
		border?: boolean
	}
>`
	background-color: ${({ background }) => background ?? Colors.lightGrey};
	padding: 6px;
	border-radius: ${Root.radius10};
	justify-content: center;
	align-items: center;
	width: ${({ width }) => width};
	box-shadow: ${({ border }) =>
		border ? `0px 2px 2px ${Colors.success};` : '0px 2px 2px transparent;'};
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
	const smallBtnWidth = Math.ceil(width / 3 - 20)
	const widthValue = `${smallBtnWidth}px`

	return (
		<FilterList>
			<FilterItem
				background={Colors.success}
				width={widthValue}
				border={queryFilter === IdeaStatus.New}
				onPress={() => handlePress(IdeaStatus.New)}
			>
				<FilterItemText>Новые</FilterItemText>
			</FilterItem>

			<FilterItem
				background={Colors.primary}
				width={widthValue}
				border={queryFilter === IdeaStatus.Approved}
				onPress={() => handlePress(IdeaStatus.Approved)}
			>
				<FilterItemText>В работе</FilterItemText>
			</FilterItem>

			<FilterItem
				background={Colors.alert}
				width={widthValue}
				border={queryFilter === IdeaStatus.Rejected}
				onPress={() => handlePress(IdeaStatus.Rejected)}
			>
				<FilterItemText>Завершены</FilterItemText>
			</FilterItem>
		</FilterList>
	)
}

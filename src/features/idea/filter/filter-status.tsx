import { IdeaStatus } from '@/entities/idea'
import { mappingStatus } from '@/entities/idea/lib/mapIdea'
import {
	TextWithThemeProps,
	ThemeContext,
	TouchableOpacityWithThemeProps,
} from '@/shared/colors.styled'
import { memo, ReactNode, useContext, useState } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	height: 60px;
	justify-content: center;
	padding: 0 0 20px 0;
	width: 100%;
`

const FilterItem = styled.TouchableOpacity<TouchableOpacityWithThemeProps>`
	background-color: ${({ theme }) => theme.colors.backdrop};
	padding: 0 30px;
	border-radius: 10px;
	border: 1px solid ${({ theme }) => theme.colors.border};
	justify-content: center;
	align-items: center;
	margin: 0 4px;
`

const FilterItemText = styled.Text<TextWithThemeProps & { active: boolean }>`
	color: ${({ active, theme }) =>
		active ? theme.colors.primary : theme.colors.text};
	font-size: 10px;
`

interface Props {
	sortingSlot?: ReactNode
	onChangeFilterStatus: (status: IdeaStatus | undefined) => void
}

function FilterComponent({
	sortingSlot,
	onChangeFilterStatus,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	const [activeItem, setActiveItem] = useState<IdeaStatus | undefined>(
		undefined
	)

	const handlePress = (item: IdeaStatus) => {
		if (activeItem === item) {
			setActiveItem(prev => undefined)
			onChangeFilterStatus(undefined)
			return
		}
		setActiveItem(prev => item)
		onChangeFilterStatus(item)
	}

	return (
		<Container>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{sortingSlot}
				{Object.entries(mappingStatus).map(([key, value]) => (
					<FilterItem
						theme={theme}
						key={key}
						onPress={() => handlePress(key as IdeaStatus)}
					>
						<FilterItemText theme={theme} active={activeItem === key}>
							{value}
						</FilterItemText>
					</FilterItem>
				))}
			</ScrollView>
		</Container>
	)
}

export const FilterIdeaStatus = memo(FilterComponent)

import { LocationDepartment } from '@/entities/idea'
import { mappingDepartment } from '@/entities/idea/lib/mapIdea'
import {
	TextWithThemeProps,
	ThemeContext,
	TouchableOpacityWithThemeProps,
} from '@/shared/colors.styled'

import { memo, useCallback, useContext, useState } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	height: 40px;
`

const FilterItem = styled.TouchableOpacity<TouchableOpacityWithThemeProps>`
	background-color: ${({ theme }) => theme.colors.backdrop};
	padding: 0 16px;
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
	onChangeFilter: (value: LocationDepartment | undefined) => void
}

function FilterComponent({ onChangeFilter }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [activeItem, setActiveItem] = useState<LocationDepartment | undefined>(
		undefined
	)

	const handlePress = useCallback(
		(item: LocationDepartment) => {
			if (activeItem === item) {
				setActiveItem(() => undefined)
				onChangeFilter(undefined)
				return
			}
			setActiveItem(prev => item)
			onChangeFilter(item)
		},
		[activeItem]
	)

	return (
		<Container>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{Object.entries(mappingDepartment).map(([key, value]) => (
					<FilterItem
						theme={theme}
						key={key}
						onPress={() => handlePress(key as LocationDepartment)}
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

export const Filter = memo(FilterComponent)

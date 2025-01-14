import { LocationDepartment, setCurrentFilter } from '@/entities/idea'
import { mappingDepartment } from '@/entities/idea/lib/mapIdea'
import {
	TextWithThemeProps,
	ThemeContext,
	TouchableOpacityWithThemeProps,
} from '@/shared/colors.styled'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks'
import { memo, ReactNode, useCallback, useContext, useState } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
	height: 80px;
	justify-content: center;
	padding: 20px 0;
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
	sortingSlot?: ReactNode
}

function FilterComponent({ sortingSlot }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const query = useAppSelector(({ ideaSlice }) => ideaSlice.currentFilter)
	const dispatch = useAppDispatch()
	const [activeItem, setActiveItem] = useState<LocationDepartment | undefined>(
		undefined
	)

	const handlePress = useCallback(
		(item: LocationDepartment) => {
			if (activeItem === item) {
				setActiveItem(prev => undefined)
				dispatch(setCurrentFilter({ ...query, department: undefined }))
				return
			}
			setActiveItem(prev => item)
			dispatch(setCurrentFilter({ ...query, department: item }))
		},
		[activeItem]
	)

	return (
		<Container>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{sortingSlot}
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

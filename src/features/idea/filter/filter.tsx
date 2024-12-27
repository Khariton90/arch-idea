import {
	TextWithThemeProps,
	ThemeContext,
	TouchableOpacityWithThemeProps,
} from '@/shared/colors.styled'

import { useContext, useState } from 'react'
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

export enum DepartmentList {
	Parnas = 'Парнас',
	Industrial = 'Индустриальный',
	Kad = 'Кад Север',
	Slav = 'Славянка',
}

export enum CategoriesList {
	New = 'Новые',
	InProgress = 'В работе',
	Completed = 'Завершенные',
	Canceled = 'Отмененные',
	Popular = 'Популярные',
}

interface Props {
	categories: 'department' | 'categories'
}

export function Filter({ categories }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	const [activeItem, setActiveItem] = useState<string | null>(null)

	const handlePress = (el: any) => {
		if (activeItem === el) {
			setActiveItem(() => null)
			return
		}
		setActiveItem(prev => el)
	}

	const list =
		categories === 'categories'
			? Object.entries(CategoriesList)
			: Object.entries(DepartmentList)

	return (
		<Container>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{list.map(([key, value]) => (
					<FilterItem theme={theme} key={key} onPress={() => handlePress(key)}>
						<FilterItemText theme={theme} active={activeItem === key}>
							{value}
						</FilterItemText>
					</FilterItem>
				))}
			</ScrollView>
		</Container>
	)
}

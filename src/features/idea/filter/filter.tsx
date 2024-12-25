import Root from '@/app/styles/Root'

import {
	TextWithThemeProps,
	ThemeContext,
	TouchableOpacityWithThemeProps,
} from '@/shared/colors.styled'

import { useContext, useState } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

const FilterItem = styled.TouchableOpacity<TouchableOpacityWithThemeProps>`
	background-color: ${({ theme }) => theme.colors.secondary};
	padding: 10px 16px;
	border-radius: ${Root.radius10};
	border: 1px solid ${({ theme }) => theme.colors.highlight};
	justify-content: center;
	align-items: center;
	margin: 0 6px;
`

const FilterItemText = styled.Text<TextWithThemeProps & { active: boolean }>`
	color: ${({ active, theme }) => (active ? theme.colors.primary : '#FFFFFF')};
	font-size: 12px;
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
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			{list.map(([key, value]) => (
				<FilterItem theme={theme} key={key} onPress={() => handlePress(key)}>
					<FilterItemText theme={theme} active={activeItem === key}>
						{value}
					</FilterItemText>
				</FilterItem>
			))}
		</ScrollView>
	)
}

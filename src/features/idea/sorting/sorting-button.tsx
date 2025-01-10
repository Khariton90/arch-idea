import {
	ThemeContext,
	TouchableOpacityWithThemeProps,
} from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks/hooks'
import { SortIcon } from '@/shared/ui/icons/sort-icon'
import React from 'react'
import { useContext } from 'react'
import styled from 'styled-components/native'

const Item = styled.TouchableOpacity<TouchableOpacityWithThemeProps>`
	background-color: ${({ theme }) => theme.colors.backdrop};
	padding: 0 16px;
	border-radius: 10px;
	border: 1px solid ${({ theme }) => theme.colors.border};
	justify-content: center;
	align-items: center;
	margin: 0 4px;
`

interface Props {
	toggleSortingModal: () => void
}

export function SortingButton({ toggleSortingModal }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const sortOptions = useAppSelector(
		({ ideaSlice }) => ideaSlice.currentFilter.sortOptions
	)

	return (
		<Item theme={theme} onPress={() => toggleSortingModal()}>
			<SortIcon active={Boolean(sortOptions)} />
		</Item>
	)
}

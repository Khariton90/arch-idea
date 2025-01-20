import { LocationDepartment, setCurrentFilter } from '@/entities/idea'
import { mappingDepartment } from '@/entities/idea/lib/mapIdea'
import { FilterButton } from '@/entities/idea/ui/filter-button'
import { ThemeContext } from '@/shared/colors.styled'
import { useAppSelector, useAppDispatch } from '@/shared/hooks/hooks'
import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { MainBottomSheet } from '@/widgets/bottom-sheet/main-bottom-sheet'
import React, { useContext } from 'react'
import { styled } from 'styled-components/native'

const Box = styled.View<{ background: string }>`
	flex-direction: row;
	flex-wrap: wrap;
	row-gap: 10px;
	column-gap: 4px;
	padding: 10px 0;
`

interface Props {
	isOpen: boolean
	index: number
	toggleSortingModal: (index: number) => void
}

export function FilterModal({
	isOpen,
	toggleSortingModal,
	index,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const query = useAppSelector(({ ideaSlice }) => ideaSlice.currentFilter)
	const dispatch = useAppDispatch()

	const handleSelect = (item: LocationDepartment) => {
		dispatch(
			setCurrentFilter({
				...query,
				department: item !== query.department ? item : undefined,
			})
		)
		toggleSortingModal(index)
	}

	return (
		<MainBottomSheet isOpen={isOpen}>
			<Typography variant='h1' text={'Фильтр по базе'} />
			<Box background={theme.colors.backdrop}>
				{Object.entries(mappingDepartment).map(([key, value]) => (
					<FilterButton
						key={key}
						onPress={() => handleSelect(key as LocationDepartment)}
						active={key === query.department}
						text={value}
					/>
				))}
			</Box>
			<UniversalButton
				title='Закрыть'
				onPress={() => toggleSortingModal(index)}
			/>
		</MainBottomSheet>
	)
}

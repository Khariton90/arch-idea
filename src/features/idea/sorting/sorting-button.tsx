import { FilterButton } from '@/entities/idea/ui/filter-button'
import { useAppSelector } from '@/shared/hooks/hooks'
import { SortIcon } from '@/shared/ui/icons/sort-icon'
import React from 'react'

interface Props {
	index: number
	toggleSortingModal: (index: number) => void
}

export function SortingButton({
	toggleSortingModal,
	index,
}: Props): JSX.Element {
	const sortOptions = useAppSelector(
		({ ideaSlice }) => ideaSlice.currentFilter.sortOptions
	)

	return (
		<FilterButton
			style={{ flexDirection: 'row' }}
			onPress={() => toggleSortingModal(index)}
			active={Boolean(sortOptions)}
			slotWithIcon={<SortIcon active={Boolean(sortOptions)} />}
		/>
	)
}

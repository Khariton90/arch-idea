import {
	IdeaQuery,
	LocationDepartment,
	Priority,
	setCurrentFilter,
	SubDepartment,
} from '@/entities/idea'
import {
	mappingDepartment,
	mappingPriority,
	mappingSubDepartment,
} from '@/entities/idea/lib/mapIdea'
import { FilterButton } from '@/entities/idea/ui/filter-button'
import { UserRole } from '@/entities/user'
import { ThemeContext } from '@/shared/colors.styled'
import { useAppSelector, useAppDispatch } from '@/shared/hooks/hooks'
import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { MainBottomSheet } from '@/widgets/bottom-sheet/main-bottom-sheet'
import React, { useContext, useState } from 'react'
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
	const dispatch = useAppDispatch()
	const query = useAppSelector(({ ideaSlice }) => ideaSlice.currentFilter)
	const isAdmin = useAppSelector(
		({ userSlice }) => userSlice.role !== UserRole.User
	)
	const [currentStateFilter, setCurrentStateFilter] = useState(query)
	const [isDirty, setIsDirty] = useState(false)

	const handleSelect = <Key extends keyof IdeaQuery>(
		objKey: Key,
		value: IdeaQuery[Key]
	) => {
		setCurrentStateFilter(prevQuery => ({
			...prevQuery,
			[objKey]: currentStateFilter[objKey] !== value ? value : undefined,
		}))

		setIsDirty(() => true)
	}

	const handleSubmitQuery = () => {
		dispatch(
			setCurrentFilter({
				...currentStateFilter,
			})
		)
		setIsDirty(() => false)
		toggleSortingModal(index)
	}

	return (
		<MainBottomSheet isOpen={isOpen}>
			{isAdmin && (
				<>
					<Typography variant='h2' text={'Фильтр по базе'} />
					<Box background={theme.colors.backdrop}>
						{Object.entries(mappingDepartment).map(([key, value]) => (
							<FilterButton
								key={key}
								onPress={() =>
									handleSelect('department', key as LocationDepartment)
								}
								active={key === currentStateFilter.department}
								text={value}
							/>
						))}
					</Box>
				</>
			)}

			<Typography variant='h2' text={'Фильтр по приоритету'} />
			<Box background={theme.colors.backdrop}>
				{Object.entries(mappingPriority).map(([key, value]) => (
					<FilterButton
						key={key}
						onPress={() => handleSelect('priority', key as Priority)}
						active={key === currentStateFilter.priority}
						text={value}
					/>
				))}
			</Box>

			<Typography variant='h2' text={'Фильтр по категории'} />
			<Box background={theme.colors.backdrop}>
				{Object.entries(mappingSubDepartment).map(([key, value]) => (
					<FilterButton
						key={key}
						onPress={() => handleSelect('subDepartment', key as SubDepartment)}
						active={key === currentStateFilter.subDepartment}
						text={value}
					/>
				))}
			</Box>
			{isDirty ? (
				<UniversalButton title='Применить' onPress={handleSubmitQuery} />
			) : (
				<UniversalButton
					title='Закрыть'
					onPress={() => toggleSortingModal(index)}
				/>
			)}
		</MainBottomSheet>
	)
}

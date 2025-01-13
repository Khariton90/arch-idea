import { setCurrentFilter } from '@/entities/idea'
import { darkTheme, ThemeContext } from '@/shared/colors.styled'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks'
import { Typography } from '@/shared/ui/typography/typography'
import { MainBottomSheet } from '@/widgets/bottom-sheet/main-bottom-sheet'
import { useContext } from 'react'
import styled from 'styled-components/native'

const Box = styled.View<{ background: string }>`
	border-radius: 10px;
	background: ${({ background }) => background};
	padding: 20px;
	gap: 10px;
`

const RadioButton = styled.TouchableOpacity`
	width: 100%;
	padding: 20px 10px;
	border: 1px solid ${darkTheme.colors.secondary};
	border-radius: 10px;
`

enum SortDirectionOptions {
	CreatedAt = 'По дате',
	Popularity = 'По популярности',
}

interface Props {
	isOpen: boolean
	toggleSortingModal: () => void
}

export function SortingModal({
	isOpen,
	toggleSortingModal,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const query = useAppSelector(({ ideaSlice }) => ideaSlice.currentFilter)
	const dispatch = useAppDispatch()

	const handleSelect = (item: string) => {
		dispatch(setCurrentFilter({ ...query, sortOptions: item }))
		toggleSortingModal()
	}

	return (
		<MainBottomSheet isOpen={isOpen}>
			<Typography variant='h1' text={'Показать сначала'} align='center' />
			<Box background={theme.colors.backdrop}>
				{Object.entries(SortDirectionOptions).map(([key, value]) => (
					<RadioButton key={key} onPress={() => handleSelect(key)}>
						<Typography
							active={key === query.sortOptions}
							soft
							text={value}
							variant={'p'}
						/>
					</RadioButton>
				))}
			</Box>
		</MainBottomSheet>
	)
}

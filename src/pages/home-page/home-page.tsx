import { AddNewIdeaButton, Filter } from '@/features/idea'
import { BaseIdeasList, LayoutHeader, LayoutLogo } from '@/widgets'
import { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import React from 'react'
import { ThemeContext } from '@/shared/colors.styled'
import { useGetAccountQuery } from '@/entities/session/api'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { SortingButton } from '@/features/idea/sorting/sorting-button'
import { SortingModal } from '@/features/idea/sorting/sorting-modal'

const Main = styled.View`
	gap: 10px;
	flex: 1;
`

export function HomePage(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const { data, isLoading } = useGetAccountQuery()
	const [isOpen, setIsOpen] = useState(false)

	const toggleSortingModal = () => {
		setIsOpen(() => !isOpen)
	}

	if (isLoading) {
		return <LoadingIndicator />
	}

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.backdrop }}>
				<Main>
					{data && (
						<>
							<LayoutHeader />
							<LayoutLogo />
							<AddNewIdeaButton />
							<BaseIdeasList
								filterSlot={
									<Filter
										sortingSlot={
											<SortingButton toggleSortingModal={toggleSortingModal} />
										}
									/>
								}
							/>
						</>
					)}
				</Main>
			</SafeAreaView>

			<SortingModal isOpen={isOpen} toggleSortingModal={toggleSortingModal} />
		</>
	)
}

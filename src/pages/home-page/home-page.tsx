import { AddNewIdeaButton } from '@/features/idea'
import { BaseIdeasList, LayoutHeader, LayoutLogo } from '@/widgets'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import React from 'react'
import { ThemeContext } from '@/shared/colors.styled'
import { useGetAccountQuery } from '@/entities/session/api'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'

const Main = styled.View`
	gap: 10px;
	flex: 1;
`

export function HomePage(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const { data, isLoading } = useGetAccountQuery()

	if (isLoading) {
		return <LoadingIndicator />
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.backdrop }}>
			<Main>
				{data && (
					<>
						<LayoutHeader />
						<LayoutLogo />
						<AddNewIdeaButton />
						<BaseIdeasList />
					</>
				)}
			</Main>
		</SafeAreaView>
	)
}

import Colors from '@/app/styles/Colors'
import { IdeaCard, IdeaQuery, IdeaStatus } from '@/entities/idea'
import { useFindIdeasQuery } from '@/entities/idea/api'
import { LikeDislikeButtons } from '@/features/vote'
import { AddToWishlist } from '@/features/wishlist'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ReactNode, useState } from 'react'
import styled from 'styled-components/native'

const ErrorText = styled.Text`
	text-align: center;
	color: ${Colors.white};
	font-size: 18px;
`

interface Props {
	queryFilter: IdeaStatus | string
	navigation: NativeStackNavigationProp<any, any, any>
	emptySlot: ReactNode
}

export function BaseIdeasList({
	queryFilter,
	navigation,
	emptySlot,
}: Props): JSX.Element {
	const [query] = useState<IdeaQuery>({
		page: 0,
		sortDirection: 'desc',
		limit: 10,
	})

	const { data: ideasList, isLoading, error } = useFindIdeasQuery(query)

	return (
		<>
			{isLoading && <LoadingIndicator />}
			{error && <ErrorText>Произошла ошибка при загрузке</ErrorText>}
			{ideasList &&
				ideasList.map(idea => (
					<IdeaCard
						navigation={navigation}
						key={idea.id}
						idea={idea}
						likeDislikeSlot={
							<LikeDislikeButtons id={idea.id} likes={2} disLakes={2} />
						}
						wishlistSlot={<AddToWishlist id={idea.id} />}
					/>
				))}
		</>
	)
}

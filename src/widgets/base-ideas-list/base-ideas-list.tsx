import { IdeaCard, IdeaQuery, IdeaRdo, IdeaStatus } from '@/entities/idea'
import { useFindIdeasQuery } from '@/entities/idea/api'
import { LikeDislikeButtons } from '@/features/vote'
import { AddToWishlist } from '@/features/wishlist'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'

import { ReactNode, useState, useEffect } from 'react'

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
		limit: 20,
	})

	const [ideasList, setIdeasList] = useState<IdeaRdo[]>([])

	const { data, isLoading, isSuccess, error } = useFindIdeasQuery(query)

	useEffect(() => {
		if (data) {
			setIdeasList(prev => [...data])
		}
	}, [isSuccess, isLoading, data])

	if (isLoading) {
		return <LoadingIndicator />
	}

	if (!ideasList.length) {
		return <>{emptySlot}</>
	}

	return (
		<>
			{ideasList.map(idea => (
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

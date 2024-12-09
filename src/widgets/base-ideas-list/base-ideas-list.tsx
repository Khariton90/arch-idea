import { IdeaCard, IdeaStatus } from '@/entities/idea'
import { LikeDislikeButtons } from '@/features/vote'
import { AddToWishlist } from '@/features/wishlist'
import { useAppSelector } from '@/shared/hooks/hooks'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ReactNode } from 'react'
import { View } from 'react-native'

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
	const ideasList = useAppSelector(({ idea }) => idea.ideaList)
	const filteredIdeaList = ideasList.filter(item =>
		queryFilter ? item.status === queryFilter : item
	)

	if (!filteredIdeaList.length) {
		return <>{emptySlot}</>
	}

	return (
		<>
			{filteredIdeaList.map(idea => (
				<IdeaCard
					navigation={navigation}
					key={idea.id}
					idea={idea}
					likeDislikeSlot={
						<LikeDislikeButtons
							id={idea.id}
							likes={idea.likes}
							disLakes={idea.disLakes}
						/>
					}
					wishlistSlot={<AddToWishlist id={idea.id} />}
				/>
			))}
		</>
	)
}

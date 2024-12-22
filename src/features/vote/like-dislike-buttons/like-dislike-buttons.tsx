import { ThumbDownIcon } from '@/shared/ui/thumb-down-icon'
import { ThumbUpIcon } from '@/shared/ui/thumb-up-icon'
import { useCallback } from 'react'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { ReactionType } from '@/entities/idea'
import {
	useToggleDislikeMutation,
	useToggleLikeMutation,
} from '@/entities/vote/api'
import React from 'react'

const Box = styled.View`
	position: absolute;
	bottom: 10px;
	right: 10px;
	flex-direction: row;
	justify-content: flex-end;
	gap: 6px;
`

const Button = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	gap: 6px;
	background-color: ${Colors.transparent};
	padding: 6px;
	border-radius: ${Root.radius10};
`

const ButtonText = styled.Text`
	font-size: 12px;
	color: ${Colors.background};
`

interface Props {
	id: string
	likes: number
	disLikes: number
	reactionType: ReactionType
}

export function LikeDislikeButtons({
	id,
	likes,
	disLikes,
	reactionType,
}: Props): JSX.Element {
	const [toggleLike] = useToggleLikeMutation()

	const [toggleDislike] = useToggleDislikeMutation()

	const handleLike = useCallback(async () => {
		await toggleLike({ ideaId: id })
	}, [])

	const handleDislike = useCallback(async () => {
		await toggleDislike({ ideaId: id })
	}, [])

	return (
		<Box>
			<Button onPress={handleLike}>
				{reactionType === 'Like' ? (
					<ThumbUpIcon active={true} />
				) : (
					<ThumbUpIcon active={false} />
				)}
				<ButtonText>{likes}</ButtonText>
			</Button>
			<Button onPress={handleDislike}>
				{reactionType === 'Dislike' ? (
					<ThumbDownIcon active={true} />
				) : (
					<ThumbDownIcon active={false} />
				)}
				<ButtonText>{disLikes}</ButtonText>
			</Button>
		</Box>
	)
}

import { ThumbDownIcon } from '@/shared/ui/icons/thumb-down-icon'
import { ThumbUpIcon } from '@/shared/ui/icons/thumb-up-icon'
import { useCallback, useContext, useEffect } from 'react'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { ReactionType } from '@/entities/idea'
import {
	useToggleDislikeMutation,
	useToggleLikeMutation,
} from '@/entities/vote/api'
import React from 'react'
import { darkTheme, ThemeContext } from '@/shared/colors.styled'

const Box = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	gap: 6px;
`

const Button = styled.TouchableOpacity<{ border: string }>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 6px;
	background-color: ${darkTheme.colors.text};
	padding: 6px;
	min-width: 56px;
	border-radius: ${Root.radius10};
	border: 1px solid ${({ border }) => border};
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
	onRefetch?: () => void
}

export function LikeDislikeButtons({
	id,
	likes,
	disLikes,
	reactionType,
	onRefetch,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	const [toggleLike, { data: like, isLoading: isLoadingLike }] =
		useToggleLikeMutation()
	const [toggleDislike, { data: dislike, isLoading: isLoadingDislike }] =
		useToggleDislikeMutation()

	const handleLike = useCallback(async () => {
		await toggleLike({ ideaId: id })
	}, [])

	const handleDislike = useCallback(async () => {
		await toggleDislike({ ideaId: id })
	}, [])

	useEffect(() => {
		if (onRefetch) {
			onRefetch()
		}
	}, [like, dislike])

	return (
		<Box>
			<Button border={theme.colors.border} onPress={handleLike}>
				{reactionType === 'Like' ? (
					<ThumbUpIcon active={true} />
				) : (
					<ThumbUpIcon active={false} />
				)}
				<ButtonText>{likes}</ButtonText>
			</Button>
			<Button border={theme.colors.border} onPress={handleDislike}>
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

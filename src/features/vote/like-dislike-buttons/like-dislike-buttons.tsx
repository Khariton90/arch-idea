import { ThumbDownIcon } from '@/shared/ui/icons/thumb-down-icon'
import { ThumbUpIcon } from '@/shared/ui/icons/thumb-up-icon'
import { useContext } from 'react'
import styled from 'styled-components/native'
import { ReactionType } from '@/entities/idea'
import {
	useToggleDislikeMutation,
	useToggleLikeMutation,
} from '@/entities/vote/api'
import React from 'react'
import { ThemeContext } from '@/shared/colors.styled'
import { Typography } from '@/shared/ui/typography/typography'

const Box = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	gap: 6px;
`

const Button = styled.TouchableOpacity<{ border: string; background: string }>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 6px;
	background-color: ${({ background }) => background};
	padding: 6px;
	min-width: 56px;
	border-radius: 10px;
	border: 1px solid ${({ border }) => border};
`

interface Props {
	id: string
	likes: number
	disLikes: number
	reactionType: ReactionType
	refetch?: () => void
}

export function LikeDislikeButtons({
	id,
	likes,
	disLikes,
	reactionType,
	refetch,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	const [toggleLike] = useToggleLikeMutation()
	const [toggleDislike] = useToggleDislikeMutation()

	const handleLike = async () => {
		await toggleLike({ ideaId: id })
		if (refetch) {
			refetch()
		}
	}

	const handleDislike = async () => {
		await toggleDislike({ ideaId: id })
		if (refetch) {
			refetch()
		}
	}

	return (
		<Box>
			<Button
				background={theme.colors.background}
				border={theme.colors.border}
				onPress={handleLike}
			>
				<ThumbUpIcon active={reactionType === 'Like'} />
				<Typography variant='span' text={likes} />
			</Button>
			<Button
				background={theme.colors.background}
				border={theme.colors.border}
				onPress={handleDislike}
			>
				<ThumbDownIcon active={reactionType === 'Dislike'} />
				<Typography variant='span' text={disLikes} />
			</Button>
		</Box>
	)
}

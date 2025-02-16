import { ThemeContext } from '@/shared/colors.styled'
import { CommentsIcon } from '@/shared/ui/icons/comments-icon'
import { Typography } from '@/shared/ui/typography/typography'
import { useContext, useEffect } from 'react'
import { TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'
import { commentApi } from '../api'

import { useAppDispatch, useAppSelector } from '@/shared/hooks'

const CommentBox = styled.TouchableOpacity<{
	background: string
	border: string
}>`
	flex-direction: row;
	align-items: center;
	border-radius: 10px;
	border: 1px solid ${({ border }) => border};
	background-color: ${({ background }) => background};
	padding: 6px 12px;
	gap: 6px;
`

interface Props extends TouchableOpacityProps {
	ideaId: string
}

export function ButtonToComments({ onPress, ideaId }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<CommentBox
			onPress={onPress}
			background={theme.colors.backdrop}
			border={theme.colors.border}
		>
			<CommentsIcon />
			<CommentsCount ideaId={ideaId} />
		</CommentBox>
	)
}

export function CommentsCount({ ideaId }: { ideaId: string }): JSX.Element {
	const count = useAppSelector(({ commentSlice }) => commentSlice.commentCount)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(
			commentApi.endpoints.findCommentCount.initiate(
				{ ideaId },
				{ forceRefetch: true }
			)
		)
	}, [ideaId])

	return <Typography variant='span' text={`Комментарии ${count}`} />
}

import { ThemeContext } from '@/shared/colors.styled'
import { Avatar } from '@/shared/ui/avatar/avatar'
import { Typography } from '@/shared/ui/typography/typography'
import { useContext } from 'react'
import styled from 'styled-components/native'
import { CommentRdo } from '../model/types'
import { setCommentFormatDate } from '../lib/set-comment-format-date'

const Box = styled.View<{ background: string }>`
	background-color: ${({ background }) => background};
	padding: 10px;
	margin: 0 10px 10px 10px;
	border-radius: 10px;
	gap: 10px;
`

const UserBox = styled.View`
	flex-direction: row;
	gap: 10px;
	align-items: center;
`

interface Props {
	comment: CommentRdo
}

export function CommentItem({ comment }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<Box key={comment.id} background={theme.colors.background}>
			<UserBox>
				<Avatar name={comment.user.firstName} />
				<Typography variant='p' soft text={comment.user.firstName} />
			</UserBox>
			<Typography variant='h2' text={comment.content} />
			<Typography
				align='right'
				variant='span'
				soft
				text={setCommentFormatDate(comment.createdAt)}
			/>
		</Box>
	)
}

import { ThemeContext } from '@/shared/colors.styled'
import { Avatar } from '@/shared/ui/avatar/avatar'
import { Typography } from '@/shared/ui/typography/typography'
import { useContext } from 'react'
import styled from 'styled-components/native'
import { CommentRdo } from '../model/types'
import { setCommentFormatDate } from '../lib/set-comment-format-date'
import { View } from 'react-native'
import { mappingUserStatus } from '@/entities/user/lib/map-user-status'
import { UserStatus } from '@/entities/user'

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
				<View>
					<Typography
						variant='span'
						soft
						text={`${comment.user.firstName} ${comment.user.lastName}`}
					/>
					<Typography
						variant='span'
						soft
						text={mappingUserStatus[comment.user.status as UserStatus]}
					/>
				</View>
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

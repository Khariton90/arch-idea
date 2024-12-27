import { ThemeContext } from '@/shared/colors.styled'
import { CommentsIcon } from '@/shared/ui/icons/comments-icon'
import { Typography } from '@/shared/ui/typography/typography'
import { useContext } from 'react'
import { TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

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

interface Props extends TouchableOpacityProps {}

export function ButtonToComments({ onPress }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<CommentBox
			onPress={onPress}
			background={theme.colors.backdrop}
			border={theme.colors.border}
		>
			<CommentsIcon />
			<Typography variant='span' text='Комментарии' />
		</CommentBox>
	)
}

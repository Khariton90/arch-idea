import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { CommentsIcon } from '@/shared/ui/comments-icon'
import { TextProps, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

const CommentBox = styled.TouchableOpacity`
	flex-direction: row;
	align-items: flex-start;
	border-radius: ${Root.radius10};
	background-color: ${Colors.btnGrey};
	padding: 6px 12px;
	gap: 6px;
`
const SmallText = styled.Text<TextProps & { color?: string }>`
	color: ${({ color }) => color ?? Colors.white};
	font-size: 12px;
`

interface Props extends TouchableOpacityProps {}

export function ButtonToComments({ onPress }: Props): JSX.Element {
	return (
		<CommentBox onPress={onPress}>
			<CommentsIcon />
			<SmallText color={Colors.background}>Комментарии</SmallText>
		</CommentBox>
	)
}

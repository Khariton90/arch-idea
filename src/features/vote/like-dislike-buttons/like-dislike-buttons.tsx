import { Colors, Root } from '@/app/styles/variables'
import { ThumbDownIcon } from '@/shared/ui/thumb-down-icon'
import { ThumbUpIcon } from '@/shared/ui/thumb-up-icon'
import { useState } from 'react'
import styled from 'styled-components/native'

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
	background-color: ${Colors.btnGrey};
	padding: 6px;
	border-radius: ${Root.radius10};
`

const ButtonText = styled.Text`
	font-size: 12px;
	color: #000;
`

export function LikeDislikeButtons(): JSX.Element {
	const [like, setLike] = useState(false)
	const [disLike, setDislike] = useState(false)

	const handleLike = () => {
		if (disLike) {
			setDislike(state => false)
		}
		setLike(state => !state)
	}

	const handleDislike = () => {
		if (like) {
			setLike(state => false)
		}
		setDislike(state => !state)
	}

	return (
		<Box>
			<Button onPress={handleLike}>
				<ThumbUpIcon active={like} />
				<ButtonText>100</ButtonText>
			</Button>
			<Button onPress={handleDislike}>
				<ThumbDownIcon active={disLike} />
				<ButtonText>100</ButtonText>
			</Button>
		</Box>
	)
}

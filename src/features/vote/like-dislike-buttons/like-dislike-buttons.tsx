import { addDisLike, addLike } from '@/entities/idea/model/slice'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { ThumbDownIcon } from '@/shared/ui/thumb-down-icon'
import { ThumbUpIcon } from '@/shared/ui/thumb-up-icon'
import { useState } from 'react'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'

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

interface Props {
	id: number
	likes: number
	disLakes: number
}

export function LikeDislikeButtons({
	id,
	likes,
	disLakes,
}: Props): JSX.Element {
	const [like, setLike] = useState(false)
	const [disLike, setDislike] = useState(false)
	const dispatch = useAppDispatch()

	const handleLike = () => {
		dispatch(addLike(id))
		setLike(state => true)
	}

	const handleDislike = () => {
		dispatch(addDisLike(id))
		setDislike(state => true)
	}

	return (
		<Box>
			<Button onPress={handleLike}>
				<ThumbUpIcon active={like} />
				<ButtonText>{likes}</ButtonText>
			</Button>
			<Button onPress={handleDislike}>
				<ThumbDownIcon active={disLike} />
				<ButtonText>{disLakes}</ButtonText>
			</Button>
		</Box>
	)
}

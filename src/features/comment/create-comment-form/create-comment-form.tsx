import { useCreateCommentMutation } from '@/entities/comment/api'
import { ThemeContext } from '@/shared/colors.styled'
import { ArrowUpCircleIcon } from '@/shared/ui/icons/arrow-up-circle-icon'
import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

const Form = styled.View<{ background: string }>`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 80px;
	background-color: ${({ background }) => background};
	flex-direction: row;
	padding: 10px;
	align-items: center;
	gap: 10px;
`

const FieldInput = styled.TextInput<{ border: string; color: string }>`
	border-radius: 10px;
	padding: 10px 40px 10px 10px;
	border: 1px solid ${({ border }) => border};
	color: ${({ color }) => color};
	flex: 1;
`

const Button = styled.TouchableOpacity`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	justify-content: center;
	align-items: center;
`

interface Props {
	ideaId: string
}

export function CreateCommentForm({ ideaId }: Props): JSX.Element {
	const [value, setValue] = useState('')
	const { theme } = useContext(ThemeContext)
	const [createComment, { isLoading, isError, isSuccess }] =
		useCreateCommentMutation()

	const handleChangeText = (text: string) => {
		setValue(prev => text.trim())
	}

	const handleSubmit = async () => {
		await createComment({ ideaId, content: value })
	}

	useEffect(() => {
		if (isSuccess) {
			setValue(prev => '')
		}
	}, [isSuccess])

	return (
		<Form background={theme.colors.backdrop}>
			<FieldInput
				border={theme.colors.border}
				color={theme.colors.text}
				placeholder='Комментарий'
				placeholderTextColor={'#ccc'}
				value={value}
				onChangeText={text => handleChangeText(text)}
			/>

			{isLoading ? (
				<ActivityIndicator />
			) : (
				<Button onPress={handleSubmit}>
					<ArrowUpCircleIcon />
				</Button>
			)}
		</Form>
	)
}

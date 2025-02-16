import { useCreateCommentMutation } from '@/entities/comment/api'
import { ThemeContext } from '@/shared/colors.styled'
import { ArrowUpCircleIcon } from '@/shared/ui/icons/arrow-up-circle-icon'
import { InputField } from '@/shared/ui/input-field/input-field'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Keyboard } from 'react-native'

const Form = styled.View<{ background: string }>`
	position: absolute;
	bottom: 60px;
	width: 100%;
	height: 80px;
	background-color: ${({ background }) => background};
	flex-direction: row;
	padding: 10px;
	align-items: center;
	gap: 10px;
`

const Button = styled.TouchableOpacity<{ disabled: boolean }>`
	border-radius: 50%;
	width: 50px;
	height: 50px;
	justify-content: center;
	align-items: center;
	opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
	margin-left: 10px;
`

interface Props {
	ideaId: string
}

export function CreateCommentForm({ ideaId }: Props): JSX.Element {
	const [value, setValue] = useState({ comment: '' })
	const { theme } = useContext(ThemeContext)
	const [createComment, { isLoading, isError, isSuccess }] =
		useCreateCommentMutation()

	const handleChange = (key: string, value: string) => {
		setValue(prevForm => ({ ...prevForm, [key]: value }))
	}

	const handleSubmit = async () => {
		const content = value.comment.trim()

		if (!content) {
			return
		}

		await createComment({ ideaId, content })
		Keyboard.dismiss()
	}

	useEffect(() => {
		if (isSuccess) {
			setValue(prev => ({ comment: '' }))
		}
	}, [isSuccess])

	return (
		<Form background={theme.colors.backdrop}>
			<InputField
				disabledButton
				textKey={'comment'}
				value={value.comment || ''}
				onChangeText={handleChange}
				placeholder={'Комментарий...'}
				multiline
			>
				<Button onPress={handleSubmit} disabled={!value.comment}>
					<ArrowUpCircleIcon />
				</Button>
			</InputField>
		</Form>
	)
}

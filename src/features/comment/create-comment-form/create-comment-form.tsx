import { useCreateCommentMutation } from '@/entities/comment/api'
import { ThemeContext } from '@/shared/colors.styled'
import { ArrowUpCircleIcon } from '@/shared/ui/icons/arrow-up-circle-icon'
import { InputField } from '@/shared/ui/input-field/input-field'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
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

const Button = styled.TouchableOpacity`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	justify-content: center;
	align-items: center;
	width: 40px;
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
		await createComment({ ideaId, content: value.comment })
	}

	useEffect(() => {
		if (isSuccess) {
			setValue(prev => ({ comment: '' }))
		}
	}, [isSuccess])

	return (
		<Form background={theme.colors.backdrop}>
			<InputField
				textKey={'comment'}
				value={value.comment || ''}
				onChangeText={handleChange}
				placeholder={'Комментарий...'}
			>
				<Button onPress={handleSubmit}>
					<ArrowUpCircleIcon />
				</Button>
			</InputField>
		</Form>
	)
}

const styles = StyleSheet.create({
	textInput: {
		borderRadius: '10px',
		paddingLeft: 10,
		paddingRight: 20,
		paddingVertical: 20,
		borderWidth: 1,
		flex: 1,
	},
})

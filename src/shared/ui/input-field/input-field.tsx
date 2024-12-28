import { ThemeContext } from '@/shared/colors.styled'
import { useContext, useState } from 'react'
import styled from 'styled-components/native'
import {
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
	View,
	TextInputProps,
} from 'react-native'

const Input = styled.TextInput<
	TextInputProps & { border: string; color: string }
>`
	border-radius: 10px;
	padding: 20px 40px 20px 10px;
	border: 1px solid ${({ border }) => border};
	color: ${({ color }) => color};
`

const DoneButton = styled.TouchableOpacity<{ background: string }>`
	background-color: ${({ background }) => background};
	padding: 8px 16px;
	border-radius: 4px;
	width: 100%;
`
const DoneButtonText = styled.Text<{ color: string }>`
	color: ${({ color }) => color};
	text-align: right;
	font-weight: 600;
`

interface Props {
	textKey: any
	value: string
	onChangeText: (textKey: any, value: string) => void
	placeholder: string
	multiline?: boolean
}

export function InputField({
	textKey,
	value,
	onChangeText,
	placeholder,
	multiline,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [showDoneButton, setShowDoneButton] = useState(false)

	const handleFocus = () => {
		setShowDoneButton(() => true)
	}

	const handleBlur = () => {
		setShowDoneButton(() => false)
	}

	const activeColor = !value ? theme.colors.secondary : theme.colors.success

	return (
		<KeyboardAvoidingView behavior={'padding'}>
			<View style={styles.container}>
				<TextInput
					multiline={multiline}
					onFocus={handleFocus}
					onBlur={handleBlur}
					style={[
						styles.textInput,
						{ borderColor: activeColor, color: activeColor },
					]}
					onChangeText={text => onChangeText(textKey, text)}
					placeholderTextColor={theme.colors.secondary}
					placeholder={placeholder}
					value={value}
				/>
				{showDoneButton && (
					<DoneButton background={theme.colors.backdrop} onPress={handleBlur}>
						<DoneButtonText color={theme.colors.accent}>Готово</DoneButtonText>
					</DoneButton>
				)}
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {},
	textInput: {
		borderRadius: 10,
		paddingLeft: 10,
		paddingRight: 20,
		paddingVertical: 20,
		borderWidth: 1,
	},
})

import { ThemeContext } from '@/shared/colors.styled'
import { ReactNode, useContext, useState } from 'react'
import styled from 'styled-components/native'
import { TextInput, StyleSheet, KeyboardAvoidingView, View } from 'react-native'

const DoneButton = styled.TouchableOpacity<{
	background: string
	dnone?: boolean
}>`
	padding: 2px;
	border-radius: 4px;
	right: 10px;
	position: absolute;
	display: ${({ dnone }) => (dnone ? 'none' : 'block')};
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
	children?: ReactNode
	disabledButton?: boolean
	defaultValue?: string
	password?: boolean
}

export function InputField({
	textKey,
	value,
	defaultValue,
	onChangeText,
	placeholder,
	multiline,
	children,
	disabledButton,
	password,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [showDoneButton, setShowDoneButton] = useState(false)
	const [secure, setSecure] = useState(password)

	const handleFocus = () => {
		setShowDoneButton(() => true)
	}

	const handleBlur = () => {
		setShowDoneButton(() => false)
	}

	const activeColor = !value ? theme.colors.text : theme.colors.success

	return (
		<KeyboardAvoidingView behavior={'padding'} style={{ width: '100%' }}>
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
					placeholderTextColor={theme.colors.text}
					placeholder={placeholder}
					value={value}
					defaultValue={defaultValue}
					secureTextEntry={secure}
				/>

				{children}

				{password && !showDoneButton ? (
					<DoneButton
						dnone={false}
						background={theme.colors.backdrop}
						onPress={() => setSecure(!secure)}
					>
						<DoneButtonText color={theme.colors.accent}>
							{secure ? 'Показать' : 'Скрыть'}
						</DoneButtonText>
					</DoneButton>
				) : null}

				{showDoneButton && (
					<DoneButton
						dnone={disabledButton}
						background={theme.colors.backdrop}
						onPress={handleBlur}
					>
						<DoneButtonText color={theme.colors.accent}>Готово</DoneButtonText>
					</DoneButton>
				)}
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: '10px',
	},
	textInput: {
		flex: 1,
		borderRadius: 10,
		paddingLeft: 10,
		paddingRight: 70,
		paddingVertical: 20,
		borderWidth: 1,
	},
})

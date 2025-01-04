import { ThemeContext } from '@/shared/colors.styled'
import { ReactNode, useContext, useState } from 'react'
import styled from 'styled-components/native'
import { TextInput, StyleSheet, KeyboardAvoidingView, View } from 'react-native'

const DoneButton = styled.TouchableOpacity<{
	background: string
	dnone: boolean
}>`
	padding: 2px;
	border-radius: 4px;
	right: 10;
	position: absolute;
	display: ${({ dnone }) => (dnone ? 'none' : 'auto')};
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
	disabledButton: boolean
}

export function InputField({
	textKey,
	value,
	onChangeText,
	placeholder,
	multiline,
	children,
	disabledButton,
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
					placeholderTextColor={theme.colors.secondary}
					placeholder={placeholder}
					value={value}
				/>

				{children}

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

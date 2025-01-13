import React, { useContext } from 'react'
import styled from 'styled-components/native'
import {
	ThemeContext,
	TouchableOpacityWithThemeProps,
} from '@/shared/colors.styled'

const ButtonContainer = styled.TouchableOpacity<
	TouchableOpacityWithThemeProps & {
		fillWidth?: boolean
		disabled?: boolean
		background: string
	}
>`
	background-color: ${({ background }) => background};
	padding: 12px 20px;
	border-radius: 10px;
	align-items: center;
	width: ${({ fillWidth }) => (fillWidth ? '100%' : 'auto')};
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
	box-shadow: 0 0 1px #6e6e6e;
`

const ButtonText = styled.Text`
	color: #333;
	font-size: 16px;
	font-weight: 500;
`

interface Props {
	title: string
	onPress: () => void
	width?: number
	fullWidth?: boolean
	disabled?: boolean
	outlined?: boolean
}

export function UniversalButton({
	onPress,
	title,
	fullWidth,
	disabled,
	outlined,
}: Props) {
	const { theme } = useContext(ThemeContext)

	const background = outlined ? theme.colors.backdrop : theme.colors.primary

	return (
		<ButtonContainer
			background={background}
			theme={theme}
			onPress={onPress}
			fillWidth={fullWidth}
			disabled={disabled}
		>
			<ButtonText>{title}</ButtonText>
		</ButtonContainer>
	)
}

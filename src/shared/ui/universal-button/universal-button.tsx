import React, { useContext } from 'react'
import styled from 'styled-components/native'
import {
	ThemeContext,
	TouchableOpacityWithThemeProps,
} from '@/shared/colors.styled'
import { TouchableOpacityProps } from 'react-native'

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

interface Props extends TouchableOpacityProps {
	title: string
	width?: number
	fullWidth?: boolean
	disabled?: boolean
	type?: 'primary' | 'warning' | 'highlight' | 'error' | 'success'
}

export function UniversalButton({
	onPress,
	title,
	fullWidth,
	disabled,
	type = 'primary',
	...props
}: Props) {
	const { theme } = useContext(ThemeContext)

	return (
		<ButtonContainer
			{...props}
			background={theme.colors[type]}
			theme={theme}
			onPress={onPress}
			fillWidth={fullWidth}
			disabled={disabled}
		>
			<ButtonText>{title}</ButtonText>
		</ButtonContainer>
	)
}

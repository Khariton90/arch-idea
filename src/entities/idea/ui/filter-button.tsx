import {
	TouchableOpacityWithThemeProps,
	TextWithThemeProps,
	ThemeContext,
} from '@/shared/colors.styled'
import { ReactNode, useContext } from 'react'
import { TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

const Button = styled.TouchableOpacity<TouchableOpacityWithThemeProps>`
	background-color: ${({ theme }) => theme.colors.backdrop};
	padding: 0 30px;
	border-radius: 10px;
	border: 1px solid ${({ theme }) => theme.colors.border};
	justify-content: center;
	align-items: center;
	margin: 0 4px;
	height: 40px;
`

const Text = styled.Text<TextWithThemeProps & { active: boolean }>`
	color: ${({ active, theme }) =>
		active ? theme.colors.primary : theme.colors.text};
	font-size: 10px;
`

interface Props extends TouchableOpacityProps {
	text?: string
	active?: boolean
	slotWithIcon?: ReactNode
}

export function FilterButton({
	text,
	slotWithIcon,
	active = false,
	...props
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<Button {...props} theme={theme}>
			{slotWithIcon}
			{text && (
				<Text theme={theme} active={active}>
					{text}
				</Text>
			)}
		</Button>
	)
}

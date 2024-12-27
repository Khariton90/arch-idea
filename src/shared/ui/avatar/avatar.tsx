import {
	darkTheme,
	ThemeContext,
	ViewWithThemeProps,
} from '@/shared/colors.styled'
import { useContext } from 'react'
import { TextProps } from 'react-native'
import styled from 'styled-components/native'

const sizeList = {
	sm: 30,
	md: 36,
	lg: 38,
	xl: 120,
}

const letterList = {
	sm: 16,
	md: 18,
	lg: 20,
	xl: 36,
}

const Box = styled.View<ViewWithThemeProps & { size: number }>`
	width: ${({ size }) => `${size}px`};
	height: ${({ size }) => `${size}px`};
	background-color: ${darkTheme.colors.success};
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	align-self: center;
	justify-content: center;
	align-items: center;
`

const Letter = styled.Text<TextProps & { size: number }>`
	color: #ffffff;
	font-weight: 700;
	font-size: ${({ size }) => `${size}px`};
`

interface Props {
	size?: 'sm' | 'md' | 'lg' | 'xl'
	name?: string
}

export function Avatar({ size = 'sm', name }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	const letter = name ? name.slice(0, 1) : 'П'

	const avatarSize = sizeList[size]
	const letterSize = letterList[size]
	return (
		<Box theme={theme} size={avatarSize}>
			<Letter size={letterSize}>{letter}</Letter>
		</Box>
	)
}

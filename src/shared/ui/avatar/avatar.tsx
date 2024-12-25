import {
	TextWithThemeProps,
	ThemeContext,
	ViewWithThemeProps,
} from '@/shared/colors.styled'
import { useContext } from 'react'
import styled from 'styled-components/native'

const sizeList = {
	sm: 30,
	md: 36,
	xl: 120,
}

const letterList = {
	sm: 16,
	md: 18,
	xl: 36,
}

const Box = styled.View<ViewWithThemeProps & { size: number }>`
	width: ${({ size }) => `${size}px`};
	height: ${({ size }) => `${size}px`};
	background-color: #6e6e6e;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.colors.highlight};
	align-self: center;
	justify-content: center;
	align-items: center;
`

const Letter = styled.Text<TextWithThemeProps & { size: number }>`
	color: ${({ theme }) => theme.colors.text};
	font-weight: 700;
	font-size: ${({ size }) => `${size}px`};
`

interface Props {
	size?: 'sm' | 'md' | 'xl'
}

export function Avatar({ size = 'sm' }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	const avatarSize = sizeList[size]
	const letterSize = letterList[size]
	return (
		<Box theme={theme} size={avatarSize}>
			<Letter size={letterSize} theme={theme}>
				A
			</Letter>
		</Box>
	)
}

import { TextWithThemeProps, ThemeContext } from '@/shared/colors.styled'
import { useContext } from 'react'
import { TextProps } from 'react-native'
import styled from 'styled-components/native'

const weight = {
	h1: 600,
	h2: 500,
	p: 400,
	span: 400,
}

const fontSize = {
	h1: '18px',
	h2: '16px',
	p: '14px',
	span: '12px',
}

const Text = styled.Text<
	TextWithThemeProps & {
		weight: number
		fontSize: string
		soft?: boolean
		align: string
		active: boolean
	}
>`
	font-weight: ${({ weight }) => weight};
	font-size: ${({ fontSize }) => fontSize};
	color: ${({ active, theme }) =>
		active ? theme.colors.primary : theme.colors.text};
	opacity: ${({ soft }) => (soft ? 0.7 : 1)};
	line-height: 18px;
	text-align: ${({ align }) => align};
`

interface Props extends TextProps {
	variant: 'h1' | 'h2' | 'p' | 'span'
	text: string | number
	soft?: boolean
	align?: 'left' | 'right' | 'center'
	ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined
	numberOfLines?: number
	active?: boolean
}

export function Typography({
	variant,
	text,
	soft,
	align = 'left',
	ellipsizeMode,
	numberOfLines,
	active,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<Text
			active={active ?? false}
			numberOfLines={numberOfLines}
			ellipsizeMode={ellipsizeMode}
			align={align}
			theme={theme}
			weight={weight[variant]}
			soft={soft}
			fontSize={fontSize[variant]}
		>
			{text}
		</Text>
	)
}

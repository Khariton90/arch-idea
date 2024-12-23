import Colors from '@/app/styles/Colors'
import { TextWithThemeProps, ThemeContext } from '@/shared/colors.styled'
import { LampIcon } from '@/shared/ui/lamp-icon'
import { useContext } from 'react'
import styled from 'styled-components/native'

const Logo = styled.View`
	flex-direction: row;
	align-items: flex-end;
	justify-content: center;
	margin: 30px 0 0;
`

const Title = styled.Text<TextWithThemeProps>`
	font-size: 32px;
	color: ${({ theme }) => theme.colors.text};
	font-weight: 500;
	text-align: center;
	letter-spacing: -1px;
	text-transform: uppercase;
`

export function LayoutLogo(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	return (
		<Logo>
			<Title theme={theme}>Arch</Title>
			<LampIcon />
			<Title theme={theme}>Idea</Title>
		</Logo>
	)
}

import Root from '@/app/styles/Root'
import {
	darkTheme,
	ThemeContext,
	TouchableOpacityWithThemeProps,
} from '@/shared/colors.styled'
import { useContext } from 'react'
import { TextProps, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity<TouchableOpacityWithThemeProps>`
	width: 100%;
	border-radius: ${Root.radius10};
	border: 1px solid ${darkTheme.colors.highlight};
	padding: 14px;
	background-color: ${({ theme }) => theme.colors.backdrop};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const Title = styled.Text<TextProps & { color: string }>`
	color: ${({ color }) => color};
	font-weight: 600;
`

const SubTitle = styled.Text<TextProps & { color: string }>`
	font-size: 14px;
	color: ${({ color }) => color};
	opacity: 0.7;
`

interface Props {
	title: string
	subTitle: string
	onPress: () => void
}

export function BottomSheetButton({
	title,
	subTitle,
	onPress,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<ButtonContainer theme={theme} onPress={onPress}>
			<View style={{ gap: 4 }}>
				<Title color={theme.colors.text}>{title}</Title>
				<SubTitle color={theme.colors.text}>{subTitle}</SubTitle>
			</View>

			<Svg
				viewBox='0 0 20 20'
				width={20}
				height={20}
				fill={darkTheme.colors.accent}
			>
				<Path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
			</Svg>
		</ButtonContainer>
	)
}

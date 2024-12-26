import { ThemeList } from '@/entities/theme/model/types'
import {
	ThemeContext,
	ViewWithThemeProps,
	darkTheme,
} from '@/shared/colors.styled'
import { Typography } from '@/shared/ui/typography/typography'
import { useContext, useState } from 'react'
import Svg, { Path } from 'react-native-svg'
import styled from 'styled-components/native'

const Box = styled.View<ViewWithThemeProps>`
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.backdrop};
	overflow: hidden;
	margin: 10px 0 20px;
	border-width: 1px;
	border-color: #ccc;
`

const RadioButton = styled.TouchableOpacity<{ active: boolean }>`
	padding: 6px 0 10px;
	flex-direction: row;
	align-items: center;
	gap: 6px;
	padding: 10px;
	background-color: ${({ active }) =>
		active ? darkTheme.colors.success : 'none'};
`

export function ChangeTheme(): JSX.Element {
	const { toggleTheme, currentTheme, theme } = useContext(ThemeContext)
	const [selectedTheme, setSelectedTheme] = useState(currentTheme)

	const handleChange = async (theme: ThemeList) => {
		toggleTheme(theme)
		setSelectedTheme(() => theme)
	}

	return (
		<Box theme={theme}>
			<RadioButton
				active={selectedTheme === ThemeList.Auto}
				onPress={() => handleChange(ThemeList.Auto)}
			>
				<Svg
					viewBox='0 0 24 24'
					width={24}
					height={24}
					fill={darkTheme.colors.warning}
				>
					<Path d='M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10m1-17.93c3.94.49 7 3.85 7 7.93s-3.05 7.44-7 7.93z' />
				</Svg>
				<Typography variant='p' text={'Автоматически'} />
			</RadioButton>

			<RadioButton
				active={selectedTheme === ThemeList.Dark}
				onPress={() => handleChange(ThemeList.Dark)}
			>
				<Svg
					viewBox='0 0 24 24'
					width={24}
					height={24}
					fill={darkTheme.colors.warning}
				>
					<Path d='M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1' />
				</Svg>
				<Typography variant='p' text={'Темная'} />
			</RadioButton>

			<RadioButton
				active={selectedTheme === ThemeList.Light}
				onPress={() => handleChange(ThemeList.Light)}
			>
				<Svg
					viewBox='0 0 24 24'
					width={24}
					height={24}
					fill={darkTheme.colors.warning}
				>
					<Path d='M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z' />
				</Svg>
				<Typography variant='p' text={'Светлая'} />
			</RadioButton>
		</Box>
	)
}

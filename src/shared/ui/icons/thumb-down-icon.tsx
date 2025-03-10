import { darkTheme, ThemeContext } from '@/shared/colors.styled'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
	active: boolean
}

export function ThumbDownIcon({ active }: Props) {
	const { theme } = React.useContext(ThemeContext)

	return (
		<Svg
			fill={active ? darkTheme.colors.error : theme.colors.text}
			width={16}
			height={16}
			viewBox='0 0 24 24'
		>
			<Path d='M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2m4 0v12h4V3z' />
		</Svg>
	)
}

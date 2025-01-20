import { ThemeContext } from '@/shared/colors.styled'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
	active?: boolean
}

export function FilterIcon({ active }: Props) {
	const { theme } = React.useContext(ThemeContext)

	return (
		<Svg
			width={20}
			height={20}
			fill={active ? theme.colors.primary : theme.colors.text}
			viewBox='0 0 24 24'
		>
			<Path d='M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0018.95 4H5.04c-.83 0-1.3.95-.79 1.61' />
		</Svg>
	)
}

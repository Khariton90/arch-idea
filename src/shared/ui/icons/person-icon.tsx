import { darkTheme } from '@/shared/colors.styled'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
	active: boolean
}

export function PersonIcon({ active }: Props) {
	return (
		<Svg
			viewBox='0 0 24 24'
			fill={active ? darkTheme.colors.primary : 'transparent'}
			width={18}
			height={18}
			stroke={darkTheme.colors.primary}
		>
			<Path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4' />
		</Svg>
	)
}

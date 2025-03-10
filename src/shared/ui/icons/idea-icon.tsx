import { darkTheme } from '@/shared/colors.styled'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
	active?: boolean
}

export function IdeaIcon({ active }: Props) {
	return (
		<Svg
			width={18}
			height={18}
			viewBox='0 0 24 24'
			fill={active ? darkTheme.colors.primary : 'transparent'}
			stroke={darkTheme.colors.primary}
		>
			<Path d='M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7' />
		</Svg>
	)
}

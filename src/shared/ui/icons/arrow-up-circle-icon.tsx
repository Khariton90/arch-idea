import { darkTheme } from '@/shared/colors.styled'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export function ArrowUpCircleIcon() {
	return (
		<Svg
			viewBox='0 0 24 24'
			width={50}
			height={50}
			fill={darkTheme.colors.primary}
		>
			<Path d='M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0 2c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10m-1-10v4h2v-4h3l-4-4-4 4z' />
		</Svg>
	)
}

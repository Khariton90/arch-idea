import { darkTheme } from '@/shared/colors.styled'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export function ImageUploadIcon() {
	return (
		<Svg
			width={30}
			height={30}
			fill={darkTheme.colors.primary}
			viewBox='0 0 24 24'
		>
			<Path d='M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8zM5 19l3-4 2 3 3-4 4 5z' />
		</Svg>
	)
}

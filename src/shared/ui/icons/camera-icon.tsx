import { darkTheme } from '@/shared/colors.styled'
import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

export function CameraIcon() {
	return (
		<Svg
			viewBox='0 0 24 24'
			width={30}
			height={30}
			fill={darkTheme.colors.primary}
		>
			<Circle cx={12} cy={12} r={3.2} />
			<Path d='M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5' />
		</Svg>
	)
}

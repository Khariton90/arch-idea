import Colors from '@/app/styles/Colors'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export function CommentsIcon() {
	return (
		<Svg width={16} height={16} viewBox='0 0 24 24'>
			<Path
				fill={Colors.background}
				d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-2 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z'
			/>
		</Svg>
	)
}

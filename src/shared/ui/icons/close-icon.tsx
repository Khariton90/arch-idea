import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export function CloseIcon() {
	return (
		<Svg viewBox='0 0 18 18' width={18} height={18} fill={'#ccc'}>
			<Path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
		</Svg>
	)
}

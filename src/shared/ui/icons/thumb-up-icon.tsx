import { darkTheme } from '@/shared/colors.styled'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
	active: boolean
}

export function ThumbUpIcon({ active }: Props) {
	return (
		<Svg
			fill={active ? darkTheme.colors.success : darkTheme.colors.text}
			width={16}
			height={16}
			viewBox='0 0 24 24'
		>
			<Path d='M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66a4.8 4.8 0 00-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84A2.34 2.34 0 009.34 20h8.11c.7 0 1.36-.37 1.72-.97z' />
		</Svg>
	)
}

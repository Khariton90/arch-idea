import { ThemeContext } from '@/shared/colors.styled'
import * as React from 'react'
import { useContext } from 'react'
import Svg, { Path } from 'react-native-svg'

export function UpdateTextIcon() {
	const { theme } = useContext(ThemeContext)

	return (
		<Svg viewBox='0 0 24 24' width={20} height={20} fill={theme.colors.text}>
			<Path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75z' />
		</Svg>
	)
}

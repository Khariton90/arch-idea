import { ThemeContext } from '@/shared/colors.styled'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

export function SortIcon() {
	const { theme } = React.useContext(ThemeContext)
	return (
		<Svg viewBox='0 0 24 24' width={20} height={20} fill={theme.colors.text}>
			<Path d='M9.01 14H2v2h7.01v3L13 15l-3.99-4zm5.98-1v-3H22V8h-7.01V5L11 9z' />
		</Svg>
	)
}

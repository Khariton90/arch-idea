import { ThemeContext } from '@/shared/colors.styled'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
	active: boolean
}

export function SortIcon({ active }: Props) {
	const { theme } = React.useContext(ThemeContext)
	return (
		<Svg
			width={18}
			height={18}
			fill={active ? theme.colors.primary : theme.colors.text}
			viewBox='0 0 24 24'
		>
			<Path d='M3 17v2h6v-2zM3 5v2h10V5zm10 16v-2h8v-2h-8v-2h-2v6zM7 9v2H3v2h4v2h2V9zm14 4v-2H11v2zm-6-4h2V7h4V5h-4V3h-2z' />
		</Svg>
	)
}

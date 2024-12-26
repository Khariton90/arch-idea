import { ChangeTheme } from '@/features/theme'
import { Typography } from '@/shared/ui/typography/typography'
import React from 'react'

export function ThemeModal(): JSX.Element {
	return (
		<>
			<Typography variant='h1' text='Тема' />
			<Typography
				variant='p'
				soft
				text='Автоматический режим поддерживается только в тех операционных системах, которые позволяют вам управлять общесистемной цветовой гаммой'
			/>
			<ChangeTheme />
		</>
	)
}

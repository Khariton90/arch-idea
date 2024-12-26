import { UserChangeForm } from '@/features/user'
import { Typography } from '@/shared/ui/typography/typography'
import React from 'react'

export function ProfileEditModal(): JSX.Element {
	return (
		<>
			<Typography variant='h1' text='Публичное имя' />
			<UserChangeForm />
		</>
	)
}

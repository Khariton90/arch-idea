import { UserChangeForm } from '@/features/user'
import { Typography } from '@/shared/ui'
import React from 'react'

export function ProfileEditModal(): JSX.Element {
	return (
		<>
			<Typography variant='h1' text='Публичное имя' />
			<UserChangeForm />
		</>
	)
}

import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import React, { useContext, useState } from 'react'
import styled from 'styled-components/native'
import { useSignOutMutation } from '../api'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { clearSessionData } from '../model/slice'
import { resetToken } from '../api/session-api'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'

const Box = styled.View`
	padding: 20px 10px;
	justify-content: center;
	align-items: center;
`

const BoxMessage = styled.View<ViewWithThemeProps>`
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.backdrop};
	overflow: hidden;
	border-width: 1px;
	border-color: #ccc;
	padding: 10px 20px;
`

export function SignOutModal(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [signOut] = useSignOutMutation()
	const [isSignOutMessage, setIsSignOutMessage] = useState(false)
	const dispatch = useAppDispatch()

	const handleSignOut = async () => {
		if (!isSignOutMessage) {
			return setIsSignOutMessage(true)
		}

		await signOut('').then(res => {
			if (!res.error) {
				dispatch(clearSessionData())
				resetToken()
			}
		})
	}

	return (
		<>
			<Typography variant='h1' text='Выход и удаление профиля' />
			<Box>
				<UniversalButton title='Выйти' onPress={handleSignOut} fullWidth />
			</Box>

			{isSignOutMessage && (
				<BoxMessage theme={theme}>
					<Typography
						variant='h2'
						text='Хотите продолжить без сохранения данных? '
					/>
					<Typography
						variant='p'
						soft
						text='В случае выхода из профиля все несохраненные изменения будут потеряны, и повторный вход в текущий профиль станет невозможным.'
					/>
				</BoxMessage>
			)}
		</>
	)
}

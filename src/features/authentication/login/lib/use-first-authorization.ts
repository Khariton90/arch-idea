import { useSendRefreshTokenMutation } from '@/entities/session/api'
import {
	getToken,
	resetToken,
	saveToken,
} from '@/entities/session/api/session-api'
import {
	addSessionData,
	clearSessionData,
} from '@/entities/session/model/slice'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { delay } from '@/shared/lib/delay'
import { useState } from 'react'

const RESPONSE_TIMEOUT = 5000

export function useFirstAuthorization() {
	const dispatch = useAppDispatch()
	const [sendRefreshToken, { isLoading }] = useSendRefreshTokenMutation()

	const [isError, setIsError] = useState(false)

	const getTokenByAuth = async () => {
		try {
			setIsError(() => false)
			const token = await getToken()

			if (token) {
				await delay()
				const response = await sendRefreshToken(token)
				if (response.data) {
					await saveToken(response.data)
					dispatch(addSessionData(response.data))
				}

				if (response.error) {
					await delay(RESPONSE_TIMEOUT)
					setIsError(() => true)
				}
			} else {
				dispatch(clearSessionData())
			}
		} catch (error) {
			await resetToken()
		}
	}

	return { getTokenByAuth, isLoading, isError }
}

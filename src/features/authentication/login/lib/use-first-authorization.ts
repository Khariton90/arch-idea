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

export function useFirstAuthorization() {
	const dispatch = useAppDispatch()
	const [sendRefreshToken, { isLoading }] = useSendRefreshTokenMutation()

	const getTokenByAuth = async () => {
		try {
			const token = await getToken()

			if (token) {
				await delay()
				const response = await sendRefreshToken(token)

				if (response.data) {
					const sessionData = response.data
					await saveToken(sessionData)
					dispatch(addSessionData(sessionData))
				} else {
					await resetToken()
					dispatch(clearSessionData())
				}
			} else {
				dispatch(clearSessionData())
			}
		} catch {}
	}

	return { getTokenByAuth, isLoading }
}

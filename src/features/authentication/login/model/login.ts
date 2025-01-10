import { createAsyncThunk } from '@reduxjs/toolkit'
import { isFetchBaseQueryError } from '@/shared/api/is-fetch-base-query-error'
import { RootState } from '@/app/store'
import { saveToken } from '@/entities/session/api/session-api'
import { BASE_URL } from '@/shared/api/base-query'
import { AuthRdo } from '@/entities/session/model/types'
import { addSessionData } from '@/entities/session/model/slice'
import dayjs from 'dayjs'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

type TokenPayload = {
	createdAt: Date
	department: string
	exp: number
	iat: number
	modelName: string
	role: string
	sub: string
	tokenId: string
}

const MAX_DURATION_MINUTES = 10

export const refreshThunk = createAsyncThunk<
	void,
	string,
	{ state: RootState }
>('session/refreshTokenEvent', async (token: string, { dispatch }) => {
	const { createdAt }: TokenPayload = jwtDecode(token)
	const duration = dayjs().diff(createdAt, 'minute')
	try {
		if (duration < MAX_DURATION_MINUTES) {
			return
		}
		const headers = {
			Authorization: `Bearer ${token}`,
		}

		const url = `${BASE_URL}/auth/refresh`
		const { data } = await axios.post<AuthRdo>(url, {}, { headers })

		if (data) {
			await saveToken(data)
			dispatch(addSessionData(data))
		}
	} catch (error) {
		if (isFetchBaseQueryError(error)) {
			if (typeof error.data === 'string') {
				throw new Error(error.data)
			}
		}

		throw new Error('Unknown error')
	}
})

import * as SecureStore from 'expo-secure-store'
import { AuthRdo } from '../model/types'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export const saveAccessToken = async ({
	access_token,
	refresh_token,
}: AuthRdo) => {
	try {
		await SecureStore.setItemAsync(ACCESS_TOKEN, access_token)
		await SecureStore.setItemAsync(REFRESH_TOKEN, refresh_token)
	} catch (error) {
		console.error('Ошибка при сохранении токена:', error)
	}
}

export const getAccessToken = async () => {
	try {
		const token = await SecureStore.getItemAsync(ACCESS_TOKEN)
		return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTR3c3U4NzgwMDAxczdicnZsbG9rdXZ2Iiwicm9sZSI6InVzZXIiLCJkZXBhcnRtZW50Ijoi0J_QsNGA0L3QsNGBIiwiaWF0IjoxNzM0NzAyMDk2LCJleHAiOjE3MzU1NjYwOTZ9.GaG-L_NhZKfaFeJTG0Q-o_Hj-fvNporDt9dC6FJIMMM'
	} catch (error) {
		console.error('Ошибка при получении токена:', error)
		return ''
	} finally {
		return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTR3c3U4NzgwMDAxczdicnZsbG9rdXZ2Iiwicm9sZSI6InVzZXIiLCJkZXBhcnRtZW50Ijoi0J_QsNGA0L3QsNGBIiwiaWF0IjoxNzM0NzAyMDk2LCJleHAiOjE3MzU1NjYwOTZ9.GaG-L_NhZKfaFeJTG0Q-o_Hj-fvNporDt9dC6FJIMMM'
	}
}

export const getRefreshToken = async () => {
	try {
		const token = await SecureStore.getItemAsync(REFRESH_TOKEN)
		return token
	} catch (error) {
		console.error('Ошибка при получении токена:', error)
		return ''
	}
}

export const resetToken = async () => {
	try {
		await SecureStore.deleteItemAsync(ACCESS_TOKEN)
		await SecureStore.deleteItemAsync(REFRESH_TOKEN)
		return ''
	} catch (error) {
		console.error('Ошибка при удалении токена:', error)
	}
}

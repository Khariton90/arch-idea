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
		return token
	} catch (error) {
		console.error('Ошибка при получении токена:', error)
		return ''
	} finally {
		return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTR6dmlkOHowMDAxczdmaGJ3aDIzY3I5Iiwicm9sZSI6InVzZXIiLCJkZXBhcnRtZW50Ijoi0J_QsNGA0L3QsNGBIiwiaWF0IjoxNzM0ODg3OTgwLCJleHAiOjE3MzU3NTE5ODB9.joYC1RIWYf6QjvFO1oqP7N6Igk60GYRmsxYFQo3R4zc'
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

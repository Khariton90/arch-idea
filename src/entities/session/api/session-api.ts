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
		///////
		return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTU3OW1iaXgwMDAwczdiNmk1ZGdxbGxnIiwicm9sZSI6IlVzZXIiLCJkZXBhcnRtZW50IjoiUGFybmFzIiwiaWF0IjoxNzM1MzM0OTQyLCJleHAiOjE3MzYxOTg5NDJ9.5J9SPkT8nPBJZmXdFDf2hEcj6rw7uux7pUdcNQfzvck'
	} catch (error) {
		console.error('Ошибка при получении токена:', error)
		return ''
	} finally {
		return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbTU3OW1iaXgwMDAwczdiNmk1ZGdxbGxnIiwicm9sZSI6IlVzZXIiLCJkZXBhcnRtZW50IjoiUGFybmFzIiwiaWF0IjoxNzM1MzM0OTQyLCJleHAiOjE3MzYxOTg5NDJ9.5J9SPkT8nPBJZmXdFDf2hEcj6rw7uux7pUdcNQfzvck'
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
	} catch (error) {
		console.error('Ошибка при удалении токена:', error)
	}
}

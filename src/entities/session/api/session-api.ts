import * as SecureStore from 'expo-secure-store'
import { AuthRdo } from '../model/types'

const REFRESH_TOKEN = 'refresh_token'
const USER_ID = 'userId'

export const saveToken = async (dto: AuthRdo) => {
	try {
		await SecureStore.setItemAsync(REFRESH_TOKEN, dto.refresh_token)
		await SecureStore.setItemAsync(USER_ID, dto.userId)
	} catch (error) {
		console.error('Ошибка при сохранении токена:', error)
	}
}

export const getToken = async () => {
	try {
		return await SecureStore.getItemAsync(REFRESH_TOKEN)
	} catch (error) {
		console.error('Ошибка при получении токена:', error)
	}
}

export const resetToken = async () => {
	try {
		await SecureStore.deleteItemAsync(REFRESH_TOKEN)
	} catch (error) {
		console.error('Ошибка при удалении токена:', error)
	}
}

export const getLocalUserId = async () => {
	try {
		return await SecureStore.getItemAsync(USER_ID)
	} catch (error) {
		console.error('Ошибка при получении ID пользователя:', error)
	}
}

export const resetLocalUserId = async () => {
	try {
		await SecureStore.deleteItemAsync(USER_ID)
	} catch (error) {
		console.error('Ошибка при удалении ID пользователя:', error)
	}
}

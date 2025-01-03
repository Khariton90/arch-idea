import * as SecureStore from 'expo-secure-store'
import { AuthRdo } from '../model/types'

const REFRESH_TOKEN = 'refresh_token'

export const saveToken = async (dto: AuthRdo) => {
	try {
		await SecureStore.setItemAsync(REFRESH_TOKEN, dto.refresh_token)
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

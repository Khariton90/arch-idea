import * as SecureStore from 'expo-secure-store'
import { ThemeList } from './types'

const CURRENT_THEME = 'currentTheme'

export const saveTheme = async (theme: ThemeList): Promise<void> => {
	await SecureStore.setItemAsync(CURRENT_THEME, theme)
}

export const getCurrentTheme = async (): Promise<ThemeList> => {
	try {
		const currentTheme = (await SecureStore.getItemAsync(
			CURRENT_THEME
		)) as ThemeList
		return currentTheme || ThemeList.Dark
	} catch {
		return ThemeList.Dark
	}
}

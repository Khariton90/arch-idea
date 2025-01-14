import { ThemeList } from '@/entities/theme/model/types'
import { createContext } from 'react'
import {
	TextInput,
	TextProps,
	TouchableOpacityProps,
	ViewProps,
} from 'react-native'

export interface ITheme {
	colors: {
		primary: string
		secondary: string
		background: string
		backdrop: string
		surface: string
		text: string
		border: string
		shadow: string
		highlight: string
		accent: string
		warning: string
		error: string
		success: string
	}
}

export type TextWithThemeProps = TextProps & { theme: ITheme }
export type ViewWithThemeProps = ViewProps & { theme: ITheme }
export type TouchableOpacityWithThemeProps = TouchableOpacityProps & {
	theme: ITheme
}
export type InputFieldProps = TextInput & { theme: ITheme }

export const lightTheme = {
	colors: {
		primary: '#ffba4e',
		secondary: '#6C757D',
		background: '#E1E0E0',
		backdrop: '#F7F6F6',
		surface: '#F7F6F6',
		text: '#333',
		border: '#EAEAEA',
		shadow: 'rgba(51, 51, 51, 0.15)',
		highlight: '#FEFCEA',
		accent: '#ffba4e',
		warning: '#FF5722',
		error: '#EF5350',
		success: '#66BB6A',
	},
}

export const darkTheme = {
	colors: {
		primary: '#ffba4e',
		secondary: '#333',
		background: '#191919',
		backdrop: '#0A0A0A',
		surface: '#171a21',
		text: '#EEE',
		border: '#444',
		shadow: 'rgba(238, 238, 238, 0.25)',
		highlight: '#282828',
		accent: '#ffba4e',
		warning: '#FF9100',
		error: '#E53935',
		success: '#43A047',
	},
}

type ContextType = {
	currentTheme: ThemeList
	theme: ITheme
	toggleTheme: (theme: ThemeList) => void
}

export const ThemeContext = createContext<ContextType>({
	currentTheme: ThemeList.Dark,
	theme: darkTheme,
	toggleTheme: () => {},
})

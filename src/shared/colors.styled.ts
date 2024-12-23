import { createContext } from 'react'
import { TextProps, TouchableOpacityProps, ViewProps } from 'react-native'

export interface ITheme {
	colors: {
		primary: string
		secondary: string
		background: string
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

export const lightTheme = {
	colors: {
		primary: '#007BFF',
		secondary: '#6C757D',
		background: '#FFFDF7',
		text: '#333',
		border: '#EAEAEA',
		shadow: 'rgba(51, 51, 51, 0.15)',
		highlight: '#FEFCEA',
		accent: '#FFDE59',
		warning: '#FF5722',
		error: '#EF5350',
		success: '#66BB6A',
	},
}

export const darkTheme = {
	colors: {
		primary: '#FC3',
		secondary: '#333',
		background: '#191919',
		text: '#EEE',
		border: '#444',
		shadow: 'rgba(238, 238, 238, 0.25)',
		highlight: '#282828',
		accent: '#FFCC00',
		warning: '#FF9100',
		error: '#E53935',
		success: '#43A047',
	},
}

type ContextType = {
	theme: ITheme
	toggleTheme: () => void
}

export const ThemeContext = createContext<ContextType>({
	theme: darkTheme,
	toggleTheme: () => {},
})

import { getCurrentTheme, saveTheme } from '@/entities/theme/model'
import { ThemeList } from '@/entities/theme/model/types'
import { darkTheme, lightTheme, ThemeContext } from '@/shared/colors.styled'
import { ReactNode, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'

const getTheme = async () => {
	return await getCurrentTheme()
}

type Props = {
	children: ReactNode
}

function ThemeProvider({ children }: Props) {
	const [currentTheme, setCurrentTheme] = useState(darkTheme)
	const [currentType, setCurrentType] = useState(ThemeList.Dark)
	const colorScheme = useColorScheme()

	const ThemeAction = {
		[ThemeList.Auto]: () => (colorScheme === 'dark' ? darkTheme : lightTheme),
		[ThemeList.Dark]: () => darkTheme,
		[ThemeList.Light]: () => lightTheme,
	}

	const changeTheme = (currentTheme: ThemeList) => {
		setCurrentTheme(() => ThemeAction[currentTheme]())
		setCurrentType(() => currentTheme)
	}

	const toggleTheme = async (theme: ThemeList) => {
		changeTheme(theme)
		await saveTheme(theme)
	}

	useEffect(() => {
		getTheme().then(changeTheme)
	})

	return (
		<ThemeContext.Provider
			value={{ theme: currentTheme, toggleTheme, currentTheme: currentType }}
		>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider

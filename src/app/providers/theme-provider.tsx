import { darkTheme, lightTheme, ThemeContext } from '@/shared/colors.styled'
import { ReactNode, useState } from 'react'

type Props = {
	children: ReactNode
}

function ThemeProvider({ children }: Props) {
	const [currentTheme, setCurrentTheme] = useState(darkTheme)

	const toggleTheme = () => {
		setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme)
	}

	return (
		<ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider

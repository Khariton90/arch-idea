import React, { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { ITheme, ThemeContext } from '../colors.styled'
import styled from 'styled-components/native'

function getSize(size: 'sm' | 'lg' | 'md') {
	switch (size) {
		case 'sm':
			return styles.sm
		case 'lg':
			return styles.lg
		case 'md':
		default:
			return styles.md
	}
}

function getColor(color: 'primary' | 'info' | 'success', theme: ITheme) {
	switch (color) {
		case 'primary':
			return theme.colors.primary
		case 'info':
			return theme.colors.warning
		case 'success':
			return theme.colors.success
		default:
			return theme.colors.primary
	}
}

const Box = styled.View<{ background: string; border: string }>`
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background-color: ${({ background }) => background};
	border: 1px solid ${({ border }) => border};
`

interface Props {
	title: string
	size: 'sm' | 'lg' | 'md'
	color: 'primary' | 'info' | 'success'
}

export function Chip({ title, size, color }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<Box
			background={theme.colors.background}
			border={theme.colors.border}
			style={[getSize(size)]}
		>
			<Text style={[styles.text, { color: getColor(color, theme) }]}>
				{title}
			</Text>
		</Box>
	)
}

const styles = StyleSheet.create({
	sm: {
		height: 20,
		paddingHorizontal: 8,
	},
	md: {
		height: 24,
		paddingHorizontal: 10,
	},
	lg: {
		height: 28,
		paddingHorizontal: 12,
	},
	text: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		fontSize: 12,
	},
})

import { Keyboard } from 'react-native'
import styled from 'styled-components/native'
import React, { useEffect, useState } from 'react'
import { CloseIcon } from '@/shared/ui/icons/close-icon'

const CloseButton = styled.TouchableOpacity`
	position: absolute;
	z-index: 2;
	width: 20px;
	height: 20px;
	top: 10px;
	right: 10px;
	margin: auto;
`
export function CloseInputButton(): JSX.Element {
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => {
				setIsKeyboardVisible(true)
			}
		)
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				setIsKeyboardVisible(false)
			}
		)

		return () => {
			keyboardDidShowListener.remove()
			keyboardDidHideListener.remove()
		}
	}, [])

	if (!isKeyboardVisible) {
		return <></>
	}
	return (
		<CloseButton onPress={() => Keyboard.dismiss()}>
			<CloseIcon />
		</CloseButton>
	)
}

import { ThemeContext } from '@/shared/colors.styled'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { ReactNode, useContext, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'

interface Props {
	children: ReactNode
	isOpen: boolean
}

export function MainBottomSheet({ children, isOpen }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const bottomSheetRef = useRef<BottomSheet>(null)

	const handleOpen = () => {
		if (bottomSheetRef.current) {
			bottomSheetRef.current.expand()
		}
	}

	const handleClose = () => {
		if (bottomSheetRef.current) {
			bottomSheetRef.current.close()
		}
	}

	useEffect(() => {
		if (isOpen) {
			handleOpen()
			return
		}

		handleClose()
	}, [isOpen])

	return (
		<BottomSheet
			handleIndicatorStyle={{ backgroundColor: theme.colors.primary }}
			backgroundStyle={{ backgroundColor: theme.colors.background }}
			ref={bottomSheetRef}
			index={-1}
			enableContentPanningGesture={false}
			containerStyle={{ ...styles.container }}
		>
			<BottomSheetView style={{ ...styles.wrapper }}>
				{children}
			</BottomSheetView>
		</BottomSheet>
	)
}

const styles = StyleSheet.create({
	container: {
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 4,
		elevation: 10,
	},
	wrapper: {
		height: 'auto',
		gap: 10,
		paddingVertical: 20,
		paddingHorizontal: 10,
	},
})

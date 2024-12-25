import { ThemeContext } from '@/shared/colors.styled'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { ReactNode, useCallback, useContext, useEffect, useRef } from 'react'

interface Props {
	children: ReactNode
	isOpen: boolean
}

export function MainBottomSheet({ children, isOpen }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const bottomSheetRef = useRef<BottomSheet>(null)

	const handleOpen = useCallback(() => {
		if (bottomSheetRef.current) {
			bottomSheetRef.current.snapToPosition('50%')
		}
	}, [])

	const handleClose = useCallback(() => {
		if (bottomSheetRef.current) {
			bottomSheetRef.current.close()
		}
	}, [])

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
			enablePanDownToClose
		>
			<BottomSheetView>{children}</BottomSheetView>
		</BottomSheet>
	)
}

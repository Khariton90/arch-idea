import { ThemeContext } from '@/shared/colors.styled'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { ReactNode, useCallback, useContext, useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'

interface Props {
	children: ReactNode
	isOpen: boolean
}

export function MainBottomSheet({ children, isOpen }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const bottomSheetRef = useRef<BottomSheet>(null)

	const height = Dimensions.get('window').height

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
		>
			<BottomSheetView style={{ height: 'auto' }}>{children}</BottomSheetView>
		</BottomSheet>
	)
}

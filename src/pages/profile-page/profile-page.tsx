import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import styled from 'styled-components/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React, { useContext, useState } from 'react'
import { MainBottomSheet } from '@/widgets/bottom-sheet/main-bottom-sheet'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { Avatar } from '@/shared/ui/avatar/avatar'
import { ThemeContext } from '@/shared/colors.styled'
import { BottomSheetButton } from '@/shared/ui/bottom-sheet-button/bottom-sheet-button'
import { UserStatusModal } from '@/widgets/user-status-modal/user-status-modal'
import { ThemeModal } from '@/widgets/theme-modal/theme-modal'
import { ProfileEditModal } from '@/widgets/profile-edit-modal/profile-edit-modal'
import { useAppSelector } from '@/shared/hooks/hooks'
import { QrCodeModal } from '@/widgets/qr-code-modal/qr-code-modal'
import { SignOutModal } from '@/entities/session/ui/sing-out.modal'
import { mappingUserStatus } from '@/entities/user/lib/map-user-status'

const Container = styled.View<ViewProps & { background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	gap: 20px;
`

const ContainerModal = styled.View`
	gap: 10px;
	padding: 20px 10px;
`

const Box = styled.View<
	ViewProps & { top?: boolean; bottom?: boolean; background: string }
>`
	width: 100%;
	padding: 20px;
	gap: 10px;
	background-color: ${({ background }) => background};
	flex: 1;
	justify-content: center;
	border-radius: ${({ top, bottom }) =>
		top ? `0 0 20px 20px` : bottom ? `20px 20px 0 0` : '0'};
`

export function ProfilePage(): JSX.Element {
	const { firstName, lastName, status } = useAppSelector(
		({ userSlice }) => userSlice
	)

	const [modalList, setModalList] = useState([
		false,
		false,
		false,
		false,
		false,
	])

	const toggleModal = (index: number) => {
		const array = modalList.map((element, idx) =>
			idx === index ? (element = !element) : false
		)
		setModalList(prev => [...array])
	}

	const { theme } = useContext(ThemeContext)

	return (
		<GestureHandlerRootView>
			<Container background={theme.colors.background}>
				<Box background={theme.colors.backdrop} top>
					<Avatar size='xl' name={firstName} />
					<BottomSheetButton
						title={`${firstName} ${lastName}`}
						subTitle={'Публичное имя'}
						onPress={() => toggleModal(0)}
					/>
					<BottomSheetButton
						title={'Статус'}
						subTitle={mappingUserStatus[status]}
						onPress={() => toggleModal(1)}
					/>
				</Box>

				<Box background={theme.colors.backdrop} bottom>
					<BottomSheetButton
						title={'QR Code'}
						subTitle={'Пригласить коллегу'}
						onPress={() => toggleModal(2)}
					/>
					<BottomSheetButton
						title={'Тема'}
						subTitle={'Сменить тему'}
						onPress={() => toggleModal(3)}
					/>
					<BottomSheetButton
						title={'Другое'}
						subTitle={'Удалить профиль'}
						onPress={() => toggleModal(4)}
					/>
				</Box>
			</Container>

			<MainBottomSheet isOpen={modalList[0]}>
				<ContainerModal>
					<ProfileEditModal />
					<UniversalButton title='Закрыть' onPress={() => toggleModal(0)} />
				</ContainerModal>
			</MainBottomSheet>

			<MainBottomSheet isOpen={modalList[1]}>
				<ContainerModal>
					<UserStatusModal background={theme.colors.backdrop} />
					<UniversalButton title='Закрыть' onPress={() => toggleModal(1)} />
				</ContainerModal>
			</MainBottomSheet>

			<MainBottomSheet isOpen={modalList[2]}>
				<ContainerModal>
					<QrCodeModal isOpen={modalList[2]} />
					<UniversalButton title='Закрыть' onPress={() => toggleModal(2)} />
				</ContainerModal>
			</MainBottomSheet>

			<MainBottomSheet isOpen={modalList[3]}>
				<ContainerModal>
					<ThemeModal />
					<UniversalButton title='Закрыть' onPress={() => toggleModal(3)} />
				</ContainerModal>
			</MainBottomSheet>

			<MainBottomSheet isOpen={modalList[4]}>
				<ContainerModal>
					<SignOutModal />
					<UniversalButton title='Закрыть' onPress={() => toggleModal(4)} />
				</ContainerModal>
			</MainBottomSheet>
		</GestureHandlerRootView>
	)
}

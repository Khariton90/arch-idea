import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import styled from 'styled-components/native'
import React, { useContext, useState } from 'react'
import { UniversalButton, Avatar, BottomSheetButton } from '@/shared/ui'
import { ThemeContext } from '@/shared/colors.styled'
import {
	UserStatusModal,
	MainBottomSheet,
	ThemeModal,
	ProfileEditModal,
	QrCodeModal,
} from '@/widgets'
import { useAppSelector } from '@/shared/hooks'
import { SignOutModal } from '@/entities/session'
import { mappingUserStatus, UserRole } from '@/entities/user'

const Container = styled.View<ViewProps & { background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	gap: 20px;
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
	const { theme } = useContext(ThemeContext)
	const { firstName, lastName, status, role } = useAppSelector(
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

	return (
		<>
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
					{role !== UserRole.User && (
						<BottomSheetButton
							title={'QR Code'}
							subTitle={'Пригласить коллегу'}
							onPress={() => toggleModal(2)}
						/>
					)}
					<BottomSheetButton
						title={'Тема'}
						subTitle={'Сменить тему'}
						onPress={() => toggleModal(3)}
					/>
					<BottomSheetButton
						title={'Другое'}
						subTitle={'Выход'}
						onPress={() => toggleModal(4)}
					/>
				</Box>
			</Container>

			{[
				<ProfileEditModal />,
				<UserStatusModal background={theme.colors.backdrop} />,
				<QrCodeModal />,
				<ThemeModal />,
				<SignOutModal />,
			].map((element, index) => (
				<MainBottomSheet isOpen={modalList[index]} key={index}>
					{element}
					<UniversalButton title='Закрыть' onPress={() => toggleModal(index)} />
				</MainBottomSheet>
			))}
		</>
	)
}

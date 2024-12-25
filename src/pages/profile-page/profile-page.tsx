import Root from '@/app/styles/Root'
import { Text, View } from 'react-native'
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
	gap: ${Root.gap10};
	background-color: ${({ background }) => background};
	flex: 1;
	justify-content: center;
	border-radius: ${({ top, bottom }) =>
		top
			? `0 0 ${Root.radius20} ${Root.radius20}`
			: bottom
			? `${Root.radius20} ${Root.radius20} 0 0`
			: '0'};
`

enum RenderListModal {
	Status = 'Status',
	Profile = 'Profile',
}

export function ProfilePage(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false)
	const [visibleComponent, setVisibleComponent] =
		useState<RenderListModal | null>(null)

	const { theme, toggleTheme } = useContext(ThemeContext)

	const renderList = {
		[RenderListModal.Profile]: (
			<UserStatusModal
				color={theme.colors.text}
				background={theme.colors.backdrop}
			/>
		),
		[RenderListModal.Status]: (
			<UserStatusModal
				color={theme.colors.text}
				background={theme.colors.shadow}
			/>
		),
	}

	return (
		<GestureHandlerRootView>
			<Container background={theme.colors.background}>
				<Box background={theme.colors.backdrop} top>
					<Avatar size='xl' />
					<BottomSheetButton
						title={'Аноним'}
						subTitle={'Публичное имя'}
						onPress={() => {
							setVisibleComponent(() => RenderListModal.Profile)
							setIsOpen(prev => !prev)
						}}
					/>
					<BottomSheetButton
						title={'Статус'}
						subTitle={'Спец'}
						onPress={() => {
							setVisibleComponent(() => RenderListModal.Profile)
							setIsOpen(prev => !prev)
						}}
					/>
				</Box>

				<Box background={theme.colors.backdrop} bottom>
					<BottomSheetButton
						title={'QR Code'}
						subTitle={'Пригласить коллегу'}
						onPress={() => {
							setVisibleComponent(() => RenderListModal.Profile)
							setIsOpen(prev => !prev)
						}}
					/>
					<BottomSheetButton
						title={'Тема'}
						subTitle={'Сменить тему'}
						onPress={() => {
							toggleTheme()
						}}
					/>
					<BottomSheetButton
						title={'Другое'}
						subTitle={'Удалить профиль'}
						onPress={() => {
							setVisibleComponent(() => RenderListModal.Profile)
							setIsOpen(prev => !prev)
						}}
					/>
				</Box>
			</Container>

			<MainBottomSheet isOpen={isOpen}>
				{visibleComponent ? renderList[visibleComponent] : null}
				<UniversalButton
					title='Закрыть'
					onPress={() => {
						setIsOpen(() => false)
						setVisibleComponent(null)
					}}
				/>
			</MainBottomSheet>
		</GestureHandlerRootView>
	)
}

//TODO
export function StatusModal(): JSX.Element {
	return (
		<View>
			<Text>Status</Text>
		</View>
	)
}

export function ProfileModal(): JSX.Element {
	return <Text>Profile</Text>
}

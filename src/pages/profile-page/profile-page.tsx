import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import styled from 'styled-components/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React, { useContext, useState } from 'react'
import { MainBottomSheet } from '@/widgets/bottom-sheet/main-bottom-sheet'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { Avatar } from '@/shared/ui/avatar/avatar'
import { ThemeContext } from '@/shared/colors.styled'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
	gap: ${Root.gap10};
`

const Box = styled.View<ViewProps & { top?: boolean; bottom?: boolean }>`
	width: 100%;
	padding: 20px;
	gap: ${Root.gap10};
	background-color: ${Colors.lightGrey};
	flex: 1;
	justify-content: center;
	border-radius: ${({ top, bottom }) =>
		top
			? `0 0 ${Root.radius20} ${Root.radius20}`
			: bottom
			? `${Root.radius20} ${Root.radius20} 0`
			: '0'};
`

const ProfileLogo = styled.View`
	width: 120px;
	height: 120px;
	background-color: ${Colors.success};
	justify-content: center;
	align-items: center;
	border-radius: ${Root.radius20};
	align-self: center;
	justify-content: center;
	align-items: center;
`

const ProfileLetter = styled.Text`
	color: ${Colors.white};
	font-weight: 700;
	font-size: 36px;
`

const ProfileNameButton = styled.TouchableOpacity`
	width: 100%;
	border-radius: ${Root.radius10};
	border: 1px solid ${Colors.success};
	padding: 14px;
	background: ${Colors.background};
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`
const GreyText = styled.Text`
	font-size: 14px;
	color: ${Colors.colorMuted};
`

const BoldText = styled.Text`
	color: ${Colors.white};
	font-weight: 600;
`

enum RenderListModal {
	Status = 'Status',
	Profile = 'Profile',
}

const renderList = {
	[RenderListModal.Profile]: <ProfileModal />,
	[RenderListModal.Status]: <StatusModal />,
}

export function ProfilePage(): JSX.Element {
	const [isOpen, setIsOpen] = useState(false)
	const [visibleComponent, setVisibleComponent] =
		useState<RenderListModal | null>(null)

	const { toggleTheme } = useContext(ThemeContext)

	return (
		<GestureHandlerRootView>
			<Container>
				<Box top>
					<Avatar size='xl' />

					<ProfileNameButton
						onPress={() => {
							setVisibleComponent(() => RenderListModal.Profile)
							setIsOpen(prev => !prev)
						}}
					>
						<View>
							<GreyText>Публичное имя</GreyText>
							<BoldText>Аноним</BoldText>
						</View>
						<Svg
							viewBox='0 0 20 20'
							width={20}
							height={20}
							fill={Colors.success}
						>
							<Path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
						</Svg>
					</ProfileNameButton>
					<ProfileNameButton
						onPress={() => {
							setVisibleComponent(() => RenderListModal.Status)
							setIsOpen(prev => !prev)
						}}
					>
						<View>
							<GreyText>Статус</GreyText>
							<BoldText>Спец</BoldText>
						</View>
						<Svg
							viewBox='0 0 20 20'
							width={20}
							height={20}
							fill={Colors.success}
						>
							<Path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
						</Svg>
					</ProfileNameButton>
				</Box>
				<Box bottom>
					<ProfileNameButton>
						<View>
							<GreyText>Пригласить коллегу</GreyText>
							<BoldText>QR Code</BoldText>
						</View>
						<Svg
							viewBox='0 0 20 20'
							width={20}
							height={20}
							fill={Colors.success}
						>
							<Path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
						</Svg>
					</ProfileNameButton>
					<ProfileNameButton onPress={() => toggleTheme()}>
						<View>
							<GreyText>Сменить тему</GreyText>
							<BoldText>Тема</BoldText>
						</View>
						<Svg
							viewBox='0 0 20 20'
							width={20}
							height={20}
							fill={Colors.success}
						>
							<Path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
						</Svg>
					</ProfileNameButton>

					<ProfileNameButton>
						<View>
							<GreyText>Удалить профиль</GreyText>
							<BoldText>Другое</BoldText>
						</View>
						<Svg
							viewBox='0 0 20 20'
							width={20}
							height={20}
							fill={Colors.success}
						>
							<Path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z' />
						</Svg>
					</ProfileNameButton>
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

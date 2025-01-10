import { LocationDepartment } from '@/entities/idea'
import { mappingDepartment } from '@/entities/idea/lib/mapIdea'
import { UserListDto, UserOptionsDto } from '@/entities/session/model/types'
import {
	useFetchUsersQuery,
	UserRole,
	UserStatus,
	useUpdateUserOptionsMutation,
} from '@/entities/user'
import {
	mappingUserRole,
	mappingUserStatus,
} from '@/entities/user/lib/map-user-status'
import { ThemeContext } from '@/shared/colors.styled'
import { Avatar } from '@/shared/ui/avatar/avatar'
import { Chip } from '@/shared/ui/chip'
import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { MainBottomSheet } from '@/widgets/bottom-sheet/main-bottom-sheet'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { useContext } from 'react'
import { View } from 'react-native'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

const Box = styled.View`
	padding: 20px 10px;
	border: 1px solid #ccc;
	border-radius: 10px;
	flex: 1;
	gap: 6px;
`

const Row = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
`

const Container = styled.View<{ background: string }>`
	width: 100%;
	padding: 20px;
	background-color: ${({ background }) => background};
	border-radius: 10px;
`

export function DashboardPage() {
	const { theme } = useContext(ThemeContext)
	const [form, setForm] = useState<UserOptionsDto>({
		id: '',
		role: UserRole.User,
	})

	const { data: users, isFetching, isLoading, refetch } = useFetchUsersQuery('')
	const [updateUserOptions, {}] = useUpdateUserOptionsMutation()
	const [isOpen, setIsOpen] = useState(false)

	const openModal = (user: UserListDto) => {
		setForm(prev => ({ id: user.id, role: user.role }))
		setIsOpen(prev => true)
	}

	const handleSubmit = async () => {
		await updateUserOptions(form)
		setIsOpen(prev => false)
	}

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.backdrop }}>
				{users && (
					<FlatList
						style={{
							flex: 1,
							paddingVertical: 10,
							paddingHorizontal: 10,
							backgroundColor: theme.colors.background,
						}}
						refreshControl={
							<RefreshControl
								tintColor={theme.colors.success}
								refreshing={isLoading}
								onRefresh={refetch}
							/>
						}
						data={users}
						ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
						renderItem={({ item }) => (
							<>
								<Box>
									<Row>
										<Typography
											variant='h2'
											text={`${item.firstName} ${item.lastName}`}
										/>
										<Avatar size='md' name={item.firstName} />
									</Row>
									<Row>
										<Chip
											title={`Статус: ${
												mappingUserStatus[item.status as UserStatus]
											}`}
											size={'lg'}
											color={'success'}
										/>
									</Row>

									<Row>
										<Chip
											title={`Подразделение: ${
												mappingDepartment[item.department as LocationDepartment]
											}`}
											size={'lg'}
											color={'success'}
										/>
									</Row>
									<Row>
										<Chip
											title={`Роль: ${mappingUserRole[item.role]}`}
											size={'lg'}
											color={'success'}
										/>
									</Row>
									<Row>
										<Chip
											title={`Создано идей: ${item.myIdeasCount}`}
											size={'lg'}
											color={'success'}
										/>
									</Row>

									<UniversalButton
										title='Изменить'
										onPress={() => openModal(item)}
									/>
								</Box>
							</>
						)}
					/>
				)}
			</SafeAreaView>

			<MainBottomSheet isOpen={isOpen}>
				<Container background={theme.colors.highlight}>
					<Typography variant='p' text={'Изменить роль'} />
					<Picker
						dropdownIconRippleColor={theme.colors.success}
						selectedValue={form.role}
						dropdownIconColor={theme.colors.primary}
						onValueChange={(itemValue, itemIndex) =>
							setForm(prev => ({ ...prev, role: itemValue }))
						}
					>
						{Object.entries(mappingUserRole)
							.slice(1)
							.map(([key, value]) => (
								<Picker.Item
									key={key}
									color={theme.colors.success}
									label={value}
									value={key}
								/>
							))}
					</Picker>
				</Container>
				<UniversalButton title='Закрыть' onPress={() => handleSubmit()} />
			</MainBottomSheet>
		</>
	)
}

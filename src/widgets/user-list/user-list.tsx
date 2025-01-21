import { type LocationDepartment } from '@/entities/idea'
import { type UserOptionsDto } from '@/entities/session'
import {
	ChangeUserRoleModal,
	useFetchUsersQuery,
	UserQuery,
	UserRole,
	useUpdateUserOptionsMutation,
} from '@/entities/user'
import { UserCardItem } from '@/entities/user'
import { UserFilter } from '@/features/user'
import { ThemeContext } from '@/shared/colors.styled'
import { Typography, UniversalButton } from '@/shared/ui'
import React, { useState } from 'react'
import { useContext } from 'react'
import { View } from 'react-native'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { MainBottomSheet } from '../bottom-sheet/main-bottom-sheet'
import { useAppSelector } from '@/shared/hooks'
import styled from 'styled-components/native'

const Container = styled.View<{ background: string }>`
	width: 100%;
	padding: 20px 0;
	background-color: ${({ background }) => background};
	border-radius: 10px;
	flex: 1;
`

const DEFAULT_LIMIT_COUNT = 10

export function UserList(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const totalCount = useAppSelector(({ userSlice }) => userSlice.totalCount)
	const [isOpen, setIsOpen] = useState(false)
	const [form, setForm] = useState<UserOptionsDto>({
		id: '',
		role: UserRole.User,
	})
	const [query, setQuery] = useState<UserQuery>({
		page: 1,
		limit: DEFAULT_LIMIT_COUNT,
	})

	const onChangeFilter = (department: LocationDepartment | undefined) => {
		setQuery(prevQuery => ({ ...prevQuery, department }))
	}

	const {
		data: userList,
		isFetching,
		isLoading,
		refetch,
	} = useFetchUsersQuery(query)
	const [updateUserOptions, {}] = useUpdateUserOptionsMutation()

	const openModal = (user: UserOptionsDto) => {
		setForm(() => ({ id: user.id, role: user.role }))
		setIsOpen(() => true)
	}

	const loadMore = () => {
		if (userList && query.limit < totalCount && !isFetching) {
			setQuery({
				...query,
				limit: query.limit + DEFAULT_LIMIT_COUNT,
			})
		}
	}

	const handleSubmit = async () => {
		await updateUserOptions(form)
		setIsOpen(false)
	}

	const onChangeRole = (role: UserRole) => {
		setForm(prevForm => ({ ...prevForm, role }))
	}

	return (
		<>
			{userList && (
				<Container background={theme.colors.background}>
					<UserFilter onChangeFilter={onChangeFilter} />
					{!userList.users.length && (
						<Typography
							variant='h2'
							align='center'
							text={`Тут пока пользователей нет`}
						/>
					)}
					<FlatList
						style={{
							flex: 1,
							paddingHorizontal: 10,
							marginBottom: 40,
							backgroundColor: theme.colors.background,
						}}
						refreshControl={
							<RefreshControl
								tintColor={theme.colors.primary}
								refreshing={isLoading}
								onRefresh={refetch}
							/>
						}
						data={userList.users}
						ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
						onEndReached={loadMore}
						onEndReachedThreshold={0.5}
						renderItem={({ item }) => (
							<UserCardItem item={item}>
								<UniversalButton
									title='Изменить роль'
									onPress={() => openModal(item)}
								/>
							</UserCardItem>
						)}
					/>
					<MainBottomSheet isOpen={isOpen}>
						<ChangeUserRoleModal form={form} onChangeRole={onChangeRole}>
							<UniversalButton title='Закрыть' onPress={handleSubmit} />
						</ChangeUserRoleModal>
					</MainBottomSheet>
				</Container>
			)}
		</>
	)
}

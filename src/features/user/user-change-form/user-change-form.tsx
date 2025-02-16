import { UpdateUserDto, useUpdateUserMutation } from '@/entities/user'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks/hooks'
import { InputField } from '@/shared/ui/input-field/input-field'
import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/native'

const Form = styled.View<ViewWithThemeProps>`
	gap: 6px;
`

const Box = styled.View<ViewWithThemeProps>`
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.backdrop};
	overflow: hidden;
	margin: 10px 0;
	border-width: 1px;
	border-color: ${({ theme }) => theme.colors.secondary};
	padding: 10px;
`

const MIN_LINE_LENGTH = 6

export function UserChangeForm(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const { firstName, lastName, login } = useAppSelector(
		({ userSlice }) => userSlice
	)
	const [errorMessage, setErrorMessage] = useState(false)

	const [form, setForm] = useState<UpdateUserDto>({
		firstName,
		lastName,
		login,
		password: '',
	})

	const [updateUser, { data: updatedUser, isLoading, isError, isSuccess }] =
		useUpdateUserMutation()

	const handleChange = (key: string, value: string) => {
		if (errorMessage) {
			setErrorMessage(() => false)
		}

		setForm(state => ({ ...state, [key]: value.trim() }))
	}

	const handleSubmit = async () => {
		if (
			form.login.length < MIN_LINE_LENGTH ||
			form.password.length < MIN_LINE_LENGTH
		) {
			return setErrorMessage(() => true)
		}
		await updateUser(form)
	}

	useEffect(() => {}, [isSuccess])

	const invalidForm = Object.values(form).some(
		element => !element || element === ''
	)

	return (
		<Form>
			<Box theme={theme}>
				<Typography
					align='center'
					variant='p'
					text={`Логин и пароль необходимы для повторного входа с другого устройства или при выходе из сессии.`}
				/>
				<Typography
					align='center'
					variant='p'
					text={`Установите свой логин и пароль и сохраните его в надежном месте`}
				/>
			</Box>
			<Typography text={'Имя'} soft variant={'p'} />
			<InputField
				textKey={'firstName'}
				value={form.firstName || ''}
				defaultValue={form.firstName}
				onChangeText={handleChange}
				placeholder={'Имя'}
			/>
			<Typography text={'Фамилия'} soft variant={'p'} />
			<InputField
				textKey={'lastName'}
				defaultValue={form.lastName}
				value={form.lastName || ''}
				onChangeText={handleChange}
				placeholder={'Фамилия'}
			/>
			<Typography text={'Логин'} soft variant={'p'} />
			<InputField
				textKey={'login'}
				value={form.login || ''}
				onChangeText={handleChange}
				placeholder={'Логин'}
			/>
			{errorMessage && form.login.length < MIN_LINE_LENGTH ? (
				<Typography
					align='center'
					variant='span'
					soft
					text={`Минимальная длина ${MIN_LINE_LENGTH} символов`}
				/>
			) : null}
			<Typography text={'Пароль'} soft variant={'p'} />
			<InputField
				textKey={'password'}
				value={form.password || ''}
				onChangeText={handleChange}
				placeholder={'Пароль'}
				password
			/>

			{errorMessage && form.password.length < MIN_LINE_LENGTH ? (
				<Typography
					align='center'
					variant='span'
					soft
					text={`Минимальная длина ${MIN_LINE_LENGTH} символов`}
				/>
			) : null}
			{isSuccess && (
				<Typography
					align='center'
					variant='span'
					soft
					text={'Данные профиля изменены'}
				/>
			)}
			<UniversalButton
				disabled={invalidForm}
				title={'Сохранить'}
				onPress={handleSubmit}
			/>
			{isError && (
				<Typography
					align='center'
					variant='span'
					soft
					text={'Ошибка данные не изменены'}
				/>
			)}
		</Form>
	)
}

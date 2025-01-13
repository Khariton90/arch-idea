import { UpdateUserDto, useUpdateUserMutation } from '@/entities/user'
import { ViewWithThemeProps } from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks/hooks'
import { InputField } from '@/shared/ui/input-field/input-field'
import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { useEffect, useState } from 'react'
import styled from 'styled-components/native'

const Form = styled.View<ViewWithThemeProps>`
	gap: 10px;
`

const MIN_LINE_LENGTH = 6

export function UserChangeForm(): JSX.Element {
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
			<InputField
				textKey={'firstName'}
				value={form.firstName || ''}
				defaultValue={form.firstName}
				onChangeText={handleChange}
				placeholder={'Имя'}
			/>
			<InputField
				textKey={'lastName'}
				defaultValue={form.lastName}
				value={form.lastName || ''}
				onChangeText={handleChange}
				placeholder={'Фамилия'}
			/>
			<InputField
				textKey={'login'}
				value={form.login || ''}
				onChangeText={handleChange}
				placeholder={'Login'}
			/>

			{errorMessage && form.login.length < MIN_LINE_LENGTH ? (
				<Typography
					align='center'
					variant='span'
					soft
					text={`Минимальная длина ${MIN_LINE_LENGTH} символов`}
				/>
			) : null}

			<InputField
				textKey={'password'}
				value={form.password || ''}
				onChangeText={handleChange}
				placeholder={'Пароль'}
			/>

			{errorMessage && form.password.length < MIN_LINE_LENGTH ? (
				<Typography
					align='center'
					variant='span'
					soft
					text={`Минимальная длина ${MIN_LINE_LENGTH} символов`}
				/>
			) : null}

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

			{isSuccess && (
				<Typography
					align='center'
					variant='span'
					soft
					text={'Данные профиля изменены'}
				/>
			)}
		</Form>
	)
}

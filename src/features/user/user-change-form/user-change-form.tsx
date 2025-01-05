import { UpdateUserDto, useUpdateUserMutation } from '@/entities/user'
import { ViewWithThemeProps } from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks/hooks'
import { validateEmail } from '@/shared/lib/validate-email'
import { InputField } from '@/shared/ui/input-field/input-field'
import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { useEffect, useState } from 'react'
import { Vibration } from 'react-native'
import styled from 'styled-components/native'

const Form = styled.View<ViewWithThemeProps>`
	gap: 10px;
`

const initialForm: UpdateUserDto = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
}

export function UserChangeForm(): JSX.Element {
	const { firstName, lastName } = useAppSelector(({ userSlice }) => userSlice)
	const [errorMessage, setErrorMessage] = useState(false)
	const [form, setForm] = useState<UpdateUserDto>({
		firstName,
		lastName,
		email: '',
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
		if (!validateEmail(form.email)) {
			Vibration.vibrate(100)
			setErrorMessage(() => true)
			return
		}

		await updateUser(form)
	}

	useEffect(() => {
		if (isSuccess) {
			setForm(state => ({ ...initialForm }))
		}
	}, [isSuccess])

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
				textKey={'email'}
				value={form.email || ''}
				onChangeText={handleChange}
				placeholder={'Email'}
			/>
			<InputField
				textKey={'password'}
				value={form.password || ''}
				onChangeText={handleChange}
				placeholder={'Пароль'}
			/>
			{errorMessage && (
				<Typography
					align='center'
					variant='span'
					soft
					text={'Email некорректен'}
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

			<UniversalButton
				disabled={invalidForm}
				title={'Сохранить'}
				onPress={handleSubmit}
			/>
		</Form>
	)
}

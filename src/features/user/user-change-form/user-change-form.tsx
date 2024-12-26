import { UpdateUserDto, useUpdateUserMutation } from '@/entities/user'
import { setUserFullName } from '@/entities/user/model/slice'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { debounce } from '@/shared/lib/debounce'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/native'

const Form = styled.View<ViewWithThemeProps>`
	gap: 10px;
`

const InputField = styled.TextInput<{ border: string; color: string }>`
	border-radius: 10px;
	padding: 20px 40px 20px 10px;
	border: 1px solid ${({ border }) => border};
	color: ${({ color }) => color};
`

const initialForm: UpdateUserDto = {
	firstName: '',
	lastName: '',
}

export function UserChangeForm(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [form, setForm] = useState<UpdateUserDto>(initialForm)
	const dispatch = useAppDispatch()
	const [updateUser, { data: user, isLoading, isError, isSuccess }] =
		useUpdateUserMutation()

	const handleChange = debounce((key: string, value: string) => {
		setForm(state => ({ ...state, [key]: value.trim() }))
	})

	const handleSubmit = async () => {
		const user = await updateUser(form)

		if (user) {
			dispatch(setUserFullName(form))
			setForm(state => ({ ...initialForm }))
		}
	}

	return (
		<Form>
			<InputField
				border={theme.colors.secondary}
				color={theme.colors.text}
				value={form.firstName || ''}
				onChangeText={text => handleChange('firstName', text)}
				placeholder='Имя'
				placeholderTextColor={'#ccc'}
			/>

			<InputField
				border={theme.colors.secondary}
				color={theme.colors.text}
				value={form.lastName || ''}
				onChangeText={text => handleChange('lastName', text)}
				placeholder='Фамилия'
				placeholderTextColor={'#ccc'}
			/>

			<UniversalButton
				disabled={!form.firstName || !form.lastName}
				title={'Сохранить'}
				onPress={handleSubmit}
			/>
		</Form>
	)
}

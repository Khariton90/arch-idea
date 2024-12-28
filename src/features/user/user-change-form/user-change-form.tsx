import { UpdateUserDto, useUpdateUserMutation } from '@/entities/user'
import { setUserFullName } from '@/entities/user/model/slice'
import { ViewWithThemeProps } from '@/shared/colors.styled'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { debounce } from '@/shared/lib/debounce'
import { InputField } from '@/shared/ui/input-field/input-field'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { useState } from 'react'
import styled from 'styled-components/native'

const Form = styled.View<ViewWithThemeProps>`
	gap: 10px;
`

const initialForm: UpdateUserDto = {
	firstName: '',
	lastName: '',
}

export function UserChangeForm(): JSX.Element {
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
				textKey={'firstName'}
				value={form.firstName || ''}
				onChangeText={handleChange}
				placeholder={'Имя'}
			/>

			<InputField
				textKey={'lastName'}
				value={form.lastName || ''}
				onChangeText={handleChange}
				placeholder={'Фамилия'}
			/>

			<UniversalButton
				disabled={!form.firstName || !form.lastName}
				title={'Сохранить'}
				onPress={handleSubmit}
			/>
		</Form>
	)
}

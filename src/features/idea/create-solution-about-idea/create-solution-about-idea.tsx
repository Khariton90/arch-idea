import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { InputField } from '@/shared/ui/input-field/input-field'
import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Picker } from '@react-native-picker/picker'
import { mappingStatus } from '@/entities/idea/lib/mapIdea'
import { CreateIdeaSolution, IdeaStatus } from '@/entities/idea'
import { useCreateIdeaSolutionMutation } from '@/entities/idea/api'
import { useAppSelector } from '@/shared/hooks/hooks'
import { UserRole } from '@/entities/user'
import React from 'react'

const Box = styled.View<ViewWithThemeProps & { border: string }>`
	border-radius: 10px;
	overflow: hidden;
	margin: 10px 0 20px;
	border-width: 1px;
	border-color: ${({ border }) => border};
	padding: 20px 10px;
	gap: 10px;
`
type Props = {
	id: string
	fetchData: () => void
}

export function CreateSolutionAboutIdea({ id, fetchData }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [createIdeaSolution, { isSuccess }] = useCreateIdeaSolutionMutation()
	const role = useAppSelector(({ userSlice }) => userSlice.role)

	const [form, setForm] = useState<CreateIdeaSolution>({
		id,
		status: IdeaStatus.New,
		solution: '',
	})

	const handleChange = (key: keyof CreateIdeaSolution, value: string) => {
		setForm(prevForm => ({ ...prevForm, [key]: value }))
	}

	const handleSubmit = async () => {
		await createIdeaSolution(form)
	}

	useEffect(() => {
		if (isSuccess) {
			setForm({ id, status: IdeaStatus.New, solution: '' })
			fetchData()
		}
	}, [isSuccess])

	if (role === UserRole.User) {
		return <></>
	}

	return (
		<Box theme={theme} border={theme.colors.border}>
			<Typography variant='h1' align='center' text='Итоговое решение' />

			<Picker
				selectedValue={form.status}
				onValueChange={(itemValue, itemIndex) =>
					setForm(prev => ({ ...prev, status: itemValue }))
				}
				style={{ borderRadius: 10, backgroundColor: theme.colors.background }}
			>
				{Object.entries(mappingStatus).map(([key, value]) => (
					<Picker.Item
						key={key}
						color={theme.colors.success}
						label={value}
						value={key}
					/>
				))}
			</Picker>
			<InputField
				textKey={'solution'}
				value={form.solution || ''}
				onChangeText={handleChange}
				placeholder={'Сообщение о решении...'}
			/>
			<UniversalButton
				disabled={!form.solution || !form.status}
				title={'Отправить'}
				onPress={handleSubmit}
			/>
		</Box>
	)
}

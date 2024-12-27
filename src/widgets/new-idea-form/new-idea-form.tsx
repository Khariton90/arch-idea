import { ActivityIndicator, View } from 'react-native'
import styled from 'styled-components/native'
import { Accordion } from '@/shared/ui/accordion'
import { CloseInputButton } from '@/shared/ui/close-input-button'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Idea } from '@/entities/idea'
import { useCreateIdeaMutation } from '@/entities/idea/api'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { ThemeContext } from '@/shared/colors.styled'
import { Typography } from '@/shared/ui/typography/typography'
import {
	mappingDepartment,
	mappingPriority,
	mappingSubDepartment,
} from '@/entities/idea/lib/mapIdea'

const Container = styled.View<{ background: string }>`
	flex: 1;
	background-color: ${({ background }) => background};
	align-items: center;
	justify-content: center;
	padding: 20px;
`

const Form = styled.View`
	gap: 10px;
	width: 100%;
	flex: 1;
	justify-content: center;
`

const InputField = styled.TextInput`
	border-radius: 10px;
	padding: 20px 40px 20px 10px;
	border: 1px solid #ccc;
	color: #fff;
`

const accordion = [
	{
		id: 1,
		title: 'department',
		value: 'Подразделение',
		content: Object.entries(mappingDepartment),
	},
	{
		id: 2,
		title: 'subDepartment',
		value: 'Отдел',
		content: Object.entries(mappingSubDepartment),
	},
	{
		id: 3,
		title: 'priority',
		value: 'Приоритет',
		content: Object.entries(mappingPriority),
	},
]

const initialFormValues: Idea = {
	title: '',
	description: '',
	department: '',
	subDepartment: '',
	priority: '',
}

export function NewIdeaForm(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const [form, setForm] = useState<Idea>(initialFormValues)
	const [createIdea, { data, isLoading, isError, isSuccess, error }] =
		useCreateIdeaMutation()

	const handleChange = (key: keyof Idea, value: string) => {
		setForm(prevForm => ({ ...prevForm, [key]: value }))
	}

	const onSelected = (key: keyof Idea, value: string) => {
		setForm(prevForm => ({ ...prevForm, [key]: value }))
	}

	const disabled = useMemo(
		() => Object.values(form).some(item => item === ''),
		[form]
	)

	const handleSubmit = async () => {
		await createIdea(form)
	}

	useEffect(() => {
		if (data) {
			setForm(prev => ({ ...initialFormValues }))
		}
	}, [isSuccess, isLoading])

	return (
		<Container background={theme.colors.backdrop}>
			{isLoading && (
				<ActivityIndicator size={'large'} color={theme.colors.primary} />
			)}
			<Form>
				<Typography variant='h1' text='Описание идеи' align='center' />
				<View>
					<InputField
						value={form.title || ''}
						onChangeText={text => handleChange('title', text)}
						placeholder='Заголовок...'
						placeholderTextColor={'#ccc'}
					/>
				</View>
				<View>
					<InputField
						value={form.description || ''}
						onChangeText={text => handleChange('description', text)}
						placeholder='Описание...'
						placeholderTextColor={'#ccc'}
						multiline
					/>
					<CloseInputButton />
				</View>
				{accordion.map(item => (
					<Accordion
						title={item.title}
						onSelected={onSelected}
						key={item.id}
						value={item.value}
						content={item.content}
					/>
				))}
				<UniversalButton
					disabled={disabled}
					title='Создать'
					onPress={handleSubmit}
				/>
			</Form>
		</Container>
	)
}

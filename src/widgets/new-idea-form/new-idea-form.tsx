import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { TouchableOpacityProps, View } from 'react-native'
import styled from 'styled-components/native'
import { Accordion } from '@/shared/ui/accordion'
import { CloseInputButton } from '@/shared/ui/close-input-button'
import { useEffect, useMemo, useState } from 'react'
import { Idea } from '@/entities/idea'
import { useCreateIdeaMutation } from '@/entities/idea/api'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'

const Form = styled.View`
	gap: ${Root.gap10};
	width: 100%;
	flex: 1;
	justify-content: center;
`

const Text = styled.Text`
	font-size: 18px;
	font-weight: 600;
	color: ${Colors.white};
	text-align: center;
	margin-bottom: 10px;
`

const InputField = styled.TextInput`
	border-radius: ${Root.radius10};
	padding: 20px 40px 20px 10px;
	border: 1px solid ${Colors.grey};
	color: ${Colors.white};
`

const Button = styled.TouchableOpacity<
	TouchableOpacityProps & { disabled: boolean }
>`
	width: 100%;
	padding: 18px 10px;
	justify-content: center;
	align-items: center;
	border-radius: ${Root.radius10};
	background-color: ${Colors.success};
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`

const TextButton = styled.Text`
	font-size: 16px;
	color: ${Colors.white};
	text-align: center;
`

const accordion = [
	{
		id: 1,
		title: 'department',
		value: 'Подразделение',
		content: [
			'Парнас',
			'Кад Север',
			'Индустриальный',
			'Софийская',
			'Планерная',
		],
	},
	{
		id: 2,
		title: 'subDepartment',
		value: 'Отдел',
		content: ['Коммерческий отдел', 'Торговый зал', 'Склад'],
	},
	{
		id: 3,
		title: 'priority',
		value: 'Приоритет',
		content: ['Низкий', 'Средний', 'Высокий'],
	},
]

export function NewIdeaForm(): JSX.Element {
	const initialFormValues: Idea = {
		title: '',
		description: '',
		department: '',
		subDepartment: '',
		priority: '',
	}

	const [form, setForm] = useState<Idea>(initialFormValues)

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

	const [createIdea, { data, isLoading, isError, isSuccess, error }] =
		useCreateIdeaMutation()

	const handleSubmit = async () => {
		await createIdea(form)
	}

	useEffect(() => {
		if (data) {
			setForm(prev => ({ ...initialFormValues }))
		}
	}, [isSuccess, isLoading])

	if (isLoading) {
		return <LoadingIndicator />
	}

	return (
		<Form>
			<Text>Полная информация</Text>
			<View>
				<InputField
					value={form.title || ''}
					onChangeText={text => handleChange('title', text)}
					placeholder='Заголовок...'
					placeholderTextColor={Colors.grey}
				/>
			</View>

			<View>
				<InputField
					value={form.description || ''}
					onChangeText={text => handleChange('description', text)}
					placeholder='Описание...'
					placeholderTextColor={Colors.grey}
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
		</Form>
	)
}

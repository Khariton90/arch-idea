import {
	Category,
	Idea,
	IdeaStatus,
	Priority,
	addOneIdea,
} from '@/entities/idea'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacityProps, Keyboard, Text } from 'react-native'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { generateUniqueId } from '@/shared/lib/genearte-unique-id'
import { CloseIcon } from '@/shared/ui/close-icon'
import dayjs from 'dayjs'
import { useCreateIdeaMutation } from '@/entities/idea/api/__mock__'
import { LoadingIndicator } from '@/shared/ui/loading-indicator'
import { delay } from '@/shared/lib/delay'

const Container = styled.View`
	flex: 1;
	background-color: ${Colors.background};
	align-items: center;
	justify-content: center;
	padding: 20px;
`
const Form = styled.View`
	margin: 20px;
	width: 100%;
	gap: 20px;
`

const Title = styled.Text`
	font-size: 24px;
	text-align: center;
	color: ${Colors.white};
`

const Label = styled.View`
	width: 100%;
	gap: 10px;
`

const TextLabel = styled.Text`
	color: #fff;
	font-size: 16px;
`

const TextArea = styled.TextInput`
	flex: 1;
	border: 1px solid #fff;
	padding: 10px;
	color: #fff;
	border-radius: ${Root.radius10};
`

const Input = styled.TextInput`
	flex: 1;
	border: 1px solid #fff;
	padding: 10px;
	color: #fff;
	border-radius: ${Root.radius10};
`

const Button = styled.TouchableOpacity<
	TouchableOpacityProps & { width: string }
>`
	justify-content: center;
	align-items: center;
	background-color: ${Colors.success};
	padding: 10px;
	border-radius: ${Root.radius10};
	width: ${({ width }) => width};
`

const BtnGroup = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 20px;
`

const InputField = styled.View`
	flex-direction: row;
	gap: 10px;
	align-items: center;
`

const CloseButton = styled.TouchableOpacity`
	height: 36px;
	border-radius: ${Root.radius10};
	justify-content: center;
	align-items: center;
	padding: 0 10px;
`

export function NewIdeaPage({ route }: any): JSX.Element {
	const width = Dimensions.get('window').width
	const smallBtnWidth = `${Math.ceil(width / 3 - 20)}px`
	const [isDelay, setIsDelay] = useState(false)
	const [form, setForm] = useState<Idea>({
		title: '',
		description: '',
		userId: '',
		department: '',
	})

	const [createIdea, { isError, isLoading, isSuccess, data }] =
		useCreateIdeaMutation()

	const handleChange = (key: keyof Idea, value: string) => {
		setForm({ ...form, [key]: value })
	}

	const handleSubmit = async () => {
		setIsDelay(state => true)
		await delay()
		await createIdea(form)
		setIsDelay(state => false)
	}

	const handleBlurAndDismiss = () => {
		Keyboard.dismiss()
	}

	useEffect(() => {
		if (data) {
			setForm(state => ({
				title: '',
				description: '',
				userId: '',
				department: '',
			}))
		}
	}, [isSuccess])

	console.log('1')

	if (isDelay || isLoading) {
		return <LoadingIndicator />
	}

	return (
		<Container>
			<Title>Создать новую идею</Title>
			<Form>
				<Label>
					<TextLabel>Заголовок</TextLabel>

					<InputField>
						<Input
							value={form.title}
							onChangeText={text => handleChange('title', text)}
							placeholderTextColor={Colors.btnGrey}
							placeholder='Заголовок...'
						/>
						<CloseButton onPress={handleBlurAndDismiss}>
							<CloseIcon />
						</CloseButton>
					</InputField>
				</Label>

				<Label>
					<TextLabel>Описание</TextLabel>
					<InputField>
						<TextArea
							value={form.description}
							onChangeText={text => handleChange('description', text)}
							onBlur={handleBlurAndDismiss}
							placeholderTextColor={Colors.btnGrey}
							placeholder='Описание...'
							multiline
						/>
						<CloseButton onPress={handleBlurAndDismiss}>
							<CloseIcon />
						</CloseButton>
					</InputField>
				</Label>
				{/* 
				<Label>
					<TextLabel>Категория</TextLabel>
					<BtnGroup>
						<Button width={smallBtnWidth}>
							<TextLabel>ТЗ</TextLabel>
						</Button>
						<Button width={smallBtnWidth}>
							<TextLabel>КО</TextLabel>
						</Button>
						<Button width={smallBtnWidth}>
							<TextLabel>Склад</TextLabel>
						</Button>
					</BtnGroup>
				</Label> */}

				{/* <Label>
					<TextLabel>Приоритет</TextLabel>
					<BtnGroup>
						<Button width={smallBtnWidth}>
							<TextLabel>Высокий</TextLabel>
						</Button>
						<Button width={smallBtnWidth}>
							<TextLabel>Средний</TextLabel>
						</Button>
						<Button width={smallBtnWidth}>
							<TextLabel>Низкий</TextLabel>
						</Button>
					</BtnGroup>
				</Label> */}

				<Button width={`${Math.ceil(width - 40)}px`} onPress={handleSubmit}>
					<TextLabel>Создать</TextLabel>
				</Button>
			</Form>
		</Container>
	)
}

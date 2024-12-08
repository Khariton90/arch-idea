import { Category, Idea, IdeaStatus, addOneIdea } from '@/entities/idea'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { useState } from 'react'
import { Dimensions, TouchableOpacityProps, Keyboard } from 'react-native'
import styled from 'styled-components/native'
import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'

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
	width: 100%;
	border: 1px solid #fff;
	padding: 10px;
	color: #fff;
	border-radius: ${Root.radius10};
`

const Input = styled.TextInput`
	width: 100%;
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

function generateUniqueId() {
	return Math.floor(Math.random() * 100000000)
}

export function NewIdeaPage({ route }: any): JSX.Element {
	const [form, setForm] = useState<Idea>({
		id: generateUniqueId(),
		title: '',
		description: '',
		category: Category.CommercialDepartment,
		priority: 'High',
		status: IdeaStatus.New,
		creationDate: '',
		likes: 0,
		disLakes: 0,
	})

	const dispatch = useAppDispatch()
	const width = Dimensions.get('window').width
	const smallBtnWidth = `${Math.ceil(width / 3 - 20)}px`

	const handleChange = (key: keyof Idea, value: any) => {
		setForm({ ...form, [key]: value })
	}

	const handleSubmit = () => {
		dispatch(addOneIdea(form))
		setForm(
			state =>
				(state = {
					id: generateUniqueId(),
					title: '',
					description: '',
					category: Category.CommercialDepartment,
					priority: 'High',
					status: IdeaStatus.New,
					creationDate: '',
					likes: 0,
					disLakes: 0,
				})
		)
	}

	const handleBlurAndDismiss = () => {
		Keyboard.dismiss()
	}

	return (
		<Container>
			<Title>Создать новую идею</Title>
			<Form>
				<Label>
					<TextLabel>Заголовок</TextLabel>
					<Input
						value={form.title}
						onChangeText={text => handleChange('title', text)}
						onBlur={handleBlurAndDismiss}
						placeholderTextColor={Colors.btnGrey}
						placeholder='Заголовок...'
					/>
				</Label>

				<Label>
					<TextLabel>Описание</TextLabel>
					<TextArea
						value={form.description}
						onChangeText={text => handleChange('description', text)}
						onBlur={handleBlurAndDismiss}
						placeholderTextColor={Colors.btnGrey}
						placeholder='Описание...'
						multiline
					/>
				</Label>

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
				</Label>

				<Label>
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
				</Label>

				<Button width={`${Math.ceil(width - 40)}px`} onPress={handleSubmit}>
					<TextLabel>Создать</TextLabel>
				</Button>
			</Form>
		</Container>
	)
}

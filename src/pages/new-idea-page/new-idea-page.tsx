import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { generateOneMockIdea } from '@/entities/idea/api/__mock__/mock-one-idea'
import { addOneIdea } from '@/entities/idea/model/slice'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { Dimensions, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

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
`

const Input = styled.TextInput`
	width: 100%;
	border: 1px solid #fff;
	padding: 10px;
	color: #fff;
`

const Button = styled.TouchableOpacity<
	TouchableOpacityProps & { width: string }
>`
	justify-content: center;
	align-items: center;
	background-color: ${Colors.success};
	padding: 16px 10px;
	border-radius: ${Root.radius10};
	width: ${({ width }) => width};
`

const BtnGroup = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`

export function NewIdeaPage({ route }: any): JSX.Element {
	const dispatch = useAppDispatch()
	const width = Dimensions.get('window').width
	const smallBtnWidth = `${Math.ceil(width / 3 - 20)}px`

	return (
		<Container>
			<Title>Создать новую идею</Title>
			<Form>
				<Label>
					<TextLabel>Заголовок</TextLabel>
					<Input
						placeholderTextColor={Colors.btnGrey}
						placeholder='Заголовок...'
					/>
				</Label>

				<Label>
					<TextLabel>Описание</TextLabel>
					<TextArea
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

				<Button
					width={`${Math.ceil(width - 40)}px`}
					onPress={() => dispatch(addOneIdea(generateOneMockIdea()))}
				>
					<TextLabel>Создать</TextLabel>
				</Button>
			</Form>
		</Container>
	)
}

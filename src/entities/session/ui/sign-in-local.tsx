import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { InputField } from '@/shared/ui/input-field/input-field'
import { Typography } from '@/shared/ui/typography/typography'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import { useContext, useState } from 'react'
import styled from 'styled-components/native'
import { useSignInMutation } from '../api'
import * as Device from 'expo-device'
import { useAppDispatch } from '@/shared/hooks/hooks'
import { addSessionData } from '../model/slice'
import { saveToken } from '../api/session-api'
import { LayoutLogo } from '@/widgets'

const Container = styled.View<ViewWithThemeProps>`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
	align-items: center;
	justify-content: center;
`

const Row = styled.View`
	width: 100%;
	gap: 20px;
	justify-content: center;
	padding: 0 40px;
`
interface Props {
	onChangeScreen: () => void
}

export function SignInLocal({ onChangeScreen }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const dispatch = useAppDispatch()
	const [signIn, { data, isLoading, isError, error, isSuccess }] =
		useSignInMutation()
	const [modelName] = useState(Device.modelName)
	const [form, setForm] = useState({
		login: '',
		password: '',
		modelName: modelName ?? '',
	})

	const handleChange = (key: string, value: string) => {
		setForm(state => ({ ...state, [key]: value.trim() }))
	}

	const handleSubmit = async () => {
		await signIn(form).then(({ data }) => {
			if (data) {
				dispatch(addSessionData(data))
				saveToken(data)
			}
		})
	}

	return (
		<Container theme={theme}>
			<Row>
				<LayoutLogo />

				<InputField
					textKey={'login'}
					value={form.login || ''}
					onChangeText={handleChange}
					placeholder={'Логин'}
				/>

				<InputField
					textKey={'password'}
					value={form.password || ''}
					onChangeText={handleChange}
					placeholder={'Пароль'}
					password
				/>

				<UniversalButton
					disabled={!form.login || !form.password}
					fullWidth
					onPress={handleSubmit}
					title='Войти'
				/>

				<UniversalButton
					fullWidth
					onPress={onChangeScreen}
					title='Назад'
					type={'warning'}
				/>
				{error && (
					<Typography
						soft
						variant='span'
						align='center'
						text={`Ошибка авторизации`}
					/>
				)}
			</Row>
		</Container>
	)
}

import { ThemeContext } from '@/shared/colors.styled'
import { Typography, UniversalButton } from '@/shared/ui'
import { useContext } from 'react'
import styled from 'styled-components/native'

const ErrorSection = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	gap: 6px;
	padding: 20px;
`

interface Props {
	getTokenByAuth: () => void
}

export function InternetError({ getTokenByAuth }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<ErrorSection style={{ backgroundColor: theme.colors.background }}>
			<Typography text={'Ошибка интернет соединения'} variant={'h1'} />
			<Typography
				text={'Проверьте подключение и попробуйте снова'}
				variant={'span'}
				soft
			/>

			<UniversalButton
				style={{ marginTop: 10, width: '100%' }}
				title='Войти'
				onPress={getTokenByAuth}
			/>
		</ErrorSection>
	)
}

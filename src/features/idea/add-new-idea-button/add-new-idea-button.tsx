import { AppRoutes } from '@/shared/model/types'
import { UniversalButton } from '@/shared/ui/universal-button/universal-button'
import styled from 'styled-components/native'
import useCustomNavigation from '@/shared/hooks/use-custom-navigation'

const Box = styled.View`
	flex-direction: row;
	justify-content: center;
	padding: 0 20px;
`
export function AddNewIdeaButton(): JSX.Element {
	const navigation = useCustomNavigation()

	return (
		<Box>
			<UniversalButton
				fullWidth
				onPress={() => navigation.navigate(AppRoutes.NewIdeaPage)}
				title='Добавить новую идею'
			/>
		</Box>
	)
}

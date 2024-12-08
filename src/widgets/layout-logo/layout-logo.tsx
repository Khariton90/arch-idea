import Colors from '@/app/styles/Colors'
import { LampIcon } from '@/shared/ui/lamp-icon'
import { PetLogo } from '@/shared/ui/pet-logo'
import styled from 'styled-components/native'

const Logo = styled.View`
	flex-direction: row;
	align-items: flex-end;
	justify-content: center;
	margin: 30px 0 0;
`

const Title = styled.Text`
	font-size: 32px;
	color: ${Colors.success};
	font-weight: 700;
	text-align: center;
	letter-spacing: -1.9px;
	text-transform: uppercase;
`

export function LayoutLogo(): JSX.Element {
	return (
		<Logo>
			<PetLogo />
			<LampIcon />
			<Title>Idea</Title>
		</Logo>
	)
}

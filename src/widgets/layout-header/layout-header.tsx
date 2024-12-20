import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { useAppSelector } from '@/shared/hooks/hooks'
import { FavoriteIcon } from '@/shared/ui/favorite-icon'
import { IdeaIcon } from '@/shared/ui/idea-icon'
import { ThumbUpIcon } from '@/shared/ui/thumb-up-icon'
import { TextProps, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

const Header = styled.View`
	padding: 20px;
	background-color: ${Colors.lightGrey};
	border-bottom-left-radius: ${Root.radius20};
	border-bottom-right-radius: ${Root.radius20};
	position: fixed;
	top: 0;
`

const NavList = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 10px;
	gap: 10px;
`

const NavLink = styled.TouchableOpacity<TouchableOpacityProps>`
	background-color: ${Colors.background};
	padding: 10px;
	border-radius: ${Root.radius10};
	flex: 1;
	justify-content: flex-end;
	box-shadow: 0 0 2px ${Colors.success};
`

const NavLinkText = styled.Text`
	color: ${Colors.white};
	font-weight: 600;
	font-size: 12px;
	margin-top: 6px;
`

const NavLinkSmallText = styled.Text<TextProps & { color?: string }>`
	color: ${({ color }) => color ?? Colors.white};
	font-size: 12px;
`

const WrapperProfile = styled.TouchableOpacity`
	padding: 10px;
	flex-direction: row;
	margin-bottom: 10px;
	gap: 10px;
	align-items: center;
`

const ProfileIcon = styled.View`
	width: 36px;
	height: 36px;
	border-radius: ${Root.radius10};
	background-color: ${Colors.success};
	justify-content: center;
	align-items: center;
`

const ProfileIconLetter = styled.Text`
	color: ${Colors.white};
	font-weight: 600;
`

const ProfileUserName = styled.View`
	gap: 2px;
`

const TextGrey = styled.Text`
	color: ${Colors.colorMuted};
	font-size: 12px;
`

export function LayoutHeader(): JSX.Element {
	const wishlistCount = useAppSelector(
		({ wishlistSlice }) => wishlistSlice.count
	)

	const myIdeasCount = useAppSelector(({ ideaSlice }) => ideaSlice.myIdeasCount)

	return (
		<Header>
			<WrapperProfile>
				<ProfileIcon>
					<ProfileIconLetter>A</ProfileIconLetter>
				</ProfileIcon>
				<ProfileUserName>
					<ProfileIconLetter>Аноним</ProfileIconLetter>
					<TextGrey>Перейти к профил</TextGrey>
				</ProfileUserName>
			</WrapperProfile>
			<NavList>
				<NavLink>
					<FavoriteIcon active={true} />
					<NavLinkText>Избранное</NavLinkText>
					<NavLinkSmallText color={Colors.btnGrey}>
						{wishlistCount} идей
					</NavLinkSmallText>
				</NavLink>
				<NavLink>
					<IdeaIcon />
					<NavLinkText>Мои идеи</NavLinkText>
					<NavLinkSmallText color={Colors.btnGrey}>
						{myIdeasCount} идеи
					</NavLinkSmallText>
				</NavLink>
				<NavLink>
					<ThumbUpIcon active={true} />
					<NavLinkText>С отзывами</NavLinkText>
					<NavLinkSmallText color={Colors.btnGrey}>идеи</NavLinkSmallText>
				</NavLink>
			</NavList>
		</Header>
	)
}

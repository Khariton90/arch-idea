import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import { ThemeContext, ViewWithThemeProps } from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks/hooks'
import { formatIdea } from '@/shared/lib/format-idea'
import { AppRoutes } from '@/shared/model/types'
import { FavoriteIcon } from '@/shared/ui/favorite-icon'
import { IdeaIcon } from '@/shared/ui/idea-icon'
import { useContext } from 'react'
import { TextProps, TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

const Header = styled.View<ViewWithThemeProps>`
	padding: 10px 20px 0;
	background-color: ${({ theme }) => theme.colors.background};
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
	padding: 4px 10px;
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

export function LayoutHeader({ navigation }: any): JSX.Element {
	const { theme } = useContext(ThemeContext)

	const wishlistCount = useAppSelector(
		({ wishlistSlice }) => wishlistSlice.count
	)

	const myIdeasCount = useAppSelector(({ ideaSlice }) => ideaSlice.myIdeasCount)

	return (
		<Header theme={theme}>
			<WrapperProfile
				onPress={() => navigation.navigate(AppRoutes.ProfilePage)}
			>
				<ProfileIcon>
					<ProfileIconLetter>A</ProfileIconLetter>
				</ProfileIcon>
				<ProfileUserName>
					<ProfileIconLetter>Аноним</ProfileIconLetter>
					<TextGrey>Перейти к профилю</TextGrey>
				</ProfileUserName>
			</WrapperProfile>
			<NavList>
				<NavLink
					onPress={() =>
						navigation.navigate(AppRoutes.ProfileIdeasPage, {
							title: 'Избранное',
						})
					}
				>
					<FavoriteIcon active={!!wishlistCount} />
					<NavLinkText>Избранное</NavLinkText>
					<NavLinkSmallText color={Colors.btnGrey}>
						{formatIdea(wishlistCount)}
					</NavLinkSmallText>
				</NavLink>
				<NavLink
					onPress={() =>
						navigation.navigate(AppRoutes.ProfileIdeasPage, {
							title: 'Мои идеи',
						})
					}
				>
					<IdeaIcon active={!!myIdeasCount} />
					<NavLinkText>Мои идеи</NavLinkText>
					<NavLinkSmallText color={Colors.btnGrey}>
						{formatIdea(myIdeasCount)}
					</NavLinkSmallText>
				</NavLink>
			</NavList>
		</Header>
	)
}

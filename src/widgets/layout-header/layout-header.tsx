import Colors from '@/app/styles/Colors'
import Root from '@/app/styles/Root'
import {
	ThemeContext,
	TouchableOpacityWithThemeProps,
	ViewWithThemeProps,
} from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks/hooks'
import { formatIdea } from '@/shared/lib/format-idea'
import { AppRoutes } from '@/shared/model/types'
import { Avatar } from '@/shared/ui/avatar/avatar'
import { FavoriteIcon } from '@/shared/ui/icons/favorite-icon'
import { IdeaIcon } from '@/shared/ui/icons/idea-icon'
import { useContext } from 'react'
import { TextProps, View } from 'react-native'
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

const NavLink = styled.TouchableOpacity<TouchableOpacityWithThemeProps>`
	background-color: ${({ theme }) => theme.colors.surface};
	padding: 16px;
	border-radius: ${Root.radius10};
	flex: 1;
	justify-content: space-between;
	border: 1px solid ${({ theme }) => theme.colors.border};
	flex-direction: row;
`

const NavLinkText = styled.Text`
	color: ${Colors.white};
	font-weight: 600;
	font-size: 12px;
`

const NavLinkSmallText = styled.Text<TextProps & { color: string }>`
	color: ${({ color }) => color};
	font-size: 12px;
	opacity: 0.7;
`

const WrapperProfile = styled.TouchableOpacity`
	padding: 4px 10px;
	flex-direction: row;
	margin-bottom: 10px;
	gap: 10px;
	align-items: center;
`

const ProfileIconTitle = styled.Text`
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
	const firstName = useAppSelector(({ userSlice }) => userSlice.firstName)

	return (
		<Header theme={theme}>
			<WrapperProfile
				onPress={() => navigation.navigate(AppRoutes.ProfilePage)}
			>
				<Avatar size='md' name={firstName} />
				<ProfileUserName>
					<ProfileIconTitle style={{ color: theme.colors.text }}>
						{firstName}
					</ProfileIconTitle>
					<TextGrey>Перейти к профилю</TextGrey>
				</ProfileUserName>
			</WrapperProfile>
			<NavList>
				<NavLink
					theme={theme}
					onPress={() =>
						navigation.navigate(AppRoutes.ProfileIdeasPage, {
							title: 'Избранное',
						})
					}
				>
					<View>
						<NavLinkText style={{ color: theme.colors.text }}>
							Избранное
						</NavLinkText>
						<NavLinkSmallText color={theme.colors.text}>
							{formatIdea(wishlistCount)}
						</NavLinkSmallText>
					</View>
					<FavoriteIcon active={!!wishlistCount} />
				</NavLink>
				<NavLink
					theme={theme}
					onPress={() =>
						navigation.navigate(AppRoutes.ProfileIdeasPage, {
							title: 'Мои идеи',
						})
					}
				>
					<View>
						<NavLinkText style={{ color: theme.colors.text }}>
							Мои идеи
						</NavLinkText>
						<NavLinkSmallText color={theme.colors.text}>
							{formatIdea(myIdeasCount)}
						</NavLinkSmallText>
					</View>
					<IdeaIcon active={!!myIdeasCount} />
				</NavLink>
			</NavList>
		</Header>
	)
}

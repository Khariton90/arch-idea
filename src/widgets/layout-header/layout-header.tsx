import { UserRole, UserListNavLink } from '@/entities/user'
import {
	ThemeContext,
	TouchableOpacityWithThemeProps,
	ViewWithThemeProps,
} from '@/shared/colors.styled'
import { useAppSelector } from '@/shared/hooks'
import useCustomNavigation from '@/shared/hooks/use-custom-navigation'
import { formatIdea } from '@/shared/lib'
import { AppRoutes } from '@/shared/model'
import { Avatar, Typography } from '@/shared/ui'
import { FavoriteIcon } from '@/shared/ui/icons/favorite-icon'
import { IdeaIcon } from '@/shared/ui/icons/idea-icon'
import { useContext } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

const Header = styled.View<ViewWithThemeProps>`
	padding: 10px;
	background-color: ${({ theme }) => theme.colors.background};
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
`

const NavList = styled.View`
	flex-direction: row;
	justify-content: space-between;
	gap: 6px;
`

const NavLink = styled.TouchableOpacity<TouchableOpacityWithThemeProps>`
	flex: 1;
	justify-content: space-between;
	flex-direction: row;
	background-color: ${({ theme }) => theme.colors.backdrop};
	padding: 10px;
	border-radius: 10px;
	border: 1px solid ${({ theme }) => theme.colors.border};
`

const WrapperProfile = styled.TouchableOpacity`
	padding: 4px 10px;
	flex-direction: row;
	margin-bottom: 10px;
	gap: 10px;
	align-items: center;
`

export function LayoutHeader(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const navigation = useCustomNavigation()
	const wishlistCount = useAppSelector(
		({ wishlistSlice }) => wishlistSlice.count
	)
	const myIdeasCount = useAppSelector(({ ideaSlice }) => ideaSlice.myIdeasCount)
	const user = useAppSelector(({ userSlice }) => userSlice)

	return (
		<Header theme={theme}>
			<WrapperProfile
				onPress={() => navigation.navigate(AppRoutes.ProfilePage)}
			>
				<Avatar size='lg' name={user.firstName} />
				<View>
					<Typography variant='p' text={`${user.firstName} ${user.lastName}`} />
					<Typography variant='span' soft text='Перейти к профилю' />
				</View>
			</WrapperProfile>
			<NavList>
				<NavLink
					theme={theme}
					onPress={() =>
						navigation.navigate(AppRoutes.ProfileIdeasPage, {
							title: 'Избранное',
							page: 'Favorite',
						})
					}
				>
					<View>
						<Typography variant='span' text='Избранное' />
						<Typography variant='span' soft text={formatIdea(wishlistCount)} />
					</View>
					<FavoriteIcon active={!!wishlistCount} />
				</NavLink>
				<NavLink
					theme={theme}
					onPress={() =>
						navigation.navigate(AppRoutes.ProfileIdeasPage, {
							title: 'Мои идеи',
							page: 'MyIdeas',
						})
					}
				>
					<View>
						<Typography variant='span' text='Мои идеи' />
						<Typography variant='span' soft text={formatIdea(myIdeasCount)} />
					</View>
					<IdeaIcon active={!!myIdeasCount} />
				</NavLink>

				{user.role !== UserRole.User && <UserListNavLink />}
			</NavList>
		</Header>
	)
}

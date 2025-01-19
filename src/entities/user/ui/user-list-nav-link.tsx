import {
	TouchableOpacityWithThemeProps,
	ThemeContext,
} from '@/shared/colors.styled'
import useCustomNavigation from '@/shared/hooks/use-custom-navigation'
import { AppRoutes } from '@/shared/model/types'
import { PersonIcon } from '@/shared/ui/icons/person-icon'
import { Typography } from '@/shared/ui/typography/typography'
import { useContext } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { useFindTotalCountQuery } from '../api'
import { formatUsers } from '@/shared/lib/format-users'
import { useAppSelector } from '@/shared/hooks/hooks'

const NavLink = styled.TouchableOpacity<TouchableOpacityWithThemeProps>`
	flex: 1;
	justify-content: space-between;
	flex-direction: row;
	background-color: ${({ theme }) => theme.colors.backdrop};
	padding: 10px;
	border-radius: 10px;
	border: 1px solid ${({ theme }) => theme.colors.border};
`

export function UserListNavLink(): JSX.Element {
	const { theme } = useContext(ThemeContext)
	const navigation = useCustomNavigation()
	const totalCount = useAppSelector(({ userSlice }) => userSlice.totalCount)

	useFindTotalCountQuery()
	return (
		<NavLink
			theme={theme}
			onPress={() =>
				navigation.navigate(AppRoutes.DashboardPage, {
					title: 'Участники',
					page: 'DashboardPage',
				})
			}
		>
			<View>
				<Typography variant='span' text='Участники' />
				<Typography variant='span' soft text={formatUsers(totalCount ?? 0)} />
			</View>
			<PersonIcon active />
		</NavLink>
	)
}

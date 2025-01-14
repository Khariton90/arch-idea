import { UserOptionsDto } from '@/entities/session/model/types'
import { Typography } from '@/shared/ui/typography/typography'
import { Picker } from '@react-native-picker/picker'
import { ReactNode, useContext } from 'react'
import { View } from 'react-native'
import { mappingUserRole } from '../lib/map-user-status'
import { ThemeContext } from '@/shared/colors.styled'
import { UserRole } from '../model/types'

interface Props {
	form: UserOptionsDto
	onChangeRole: (role: UserRole) => void
	children: ReactNode
}

export function ChangeUserRoleModal({
	form,
	onChangeRole,
	children,
}: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<View style={{ paddingBottom: 40, gap: 20 }}>
			<Typography variant='h1' text={'Изменить роль'} />
			<Picker
				dropdownIconRippleColor={theme.colors.success}
				selectedValue={form.role}
				dropdownIconColor={theme.colors.primary}
				onValueChange={itemValue => onChangeRole(itemValue)}
			>
				{Object.entries(mappingUserRole)
					.slice(1)
					.map(([key, value]) => (
						<Picker.Item
							key={key}
							color={theme.colors.success}
							label={value}
							value={key}
						/>
					))}
			</Picker>
			{children}
		</View>
	)
}

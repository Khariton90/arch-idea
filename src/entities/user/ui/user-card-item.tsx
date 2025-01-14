import { LocationDepartment } from '@/entities/idea'
import { mappingDepartment } from '@/entities/idea/lib/mapIdea'
import { darkTheme, ThemeContext } from '@/shared/colors.styled'
import { Avatar } from '@/shared/ui/avatar/avatar'
import { Chip } from '@/shared/ui/chip'
import { Typography } from '@/shared/ui/typography/typography'
import { ReactNode, useContext } from 'react'
import styled from 'styled-components/native'
import { mappingUserStatus, mappingUserRole } from '../lib/map-user-status'
import { UserStatus } from '../model/types'
import { UserDto } from '@/entities/session/model/types'

const Box = styled.View`
	padding: 20px;
	border: 1px solid ${darkTheme.colors.secondary};
	border-radius: 10px;
	flex: 1;
	gap: 16px;
	width: 100%;
`

const Row = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
`

const Container = styled.View<{ background: string }>`
	width: 100%;
	padding: 20px 0;
	background-color: ${({ background }) => background};
	border-radius: 10px;
	flex: 1;
`

interface Props {
	item: UserDto
	children: ReactNode
}

export function UserCardItem({ item, children }: Props): JSX.Element {
	const { theme } = useContext(ThemeContext)

	return (
		<Box style={{ backgroundColor: theme.colors.backdrop }}>
			<Row>
				<Avatar size='md' name={item.firstName} />
				<Typography variant='h2' text={`${item.firstName} ${item.lastName}`} />
			</Row>
			<Row>
				<Chip
					title={`Статус: ${mappingUserStatus[item.status as UserStatus]}`}
					size={'lg'}
					color={'success'}
				/>
			</Row>
			<Row>
				<Chip
					title={`Подразделение: ${
						mappingDepartment[item.department as LocationDepartment]
					}`}
					size={'lg'}
					color={'success'}
				/>
			</Row>
			<Row>
				<Chip
					title={`Роль: ${mappingUserRole[item.role]}`}
					size={'lg'}
					color={'success'}
				/>
			</Row>
			<Row>
				<Chip
					title={`Создано идей: ${item.myIdeasCount}`}
					size={'lg'}
					color={'success'}
				/>
			</Row>
			{children}
		</Box>
	)
}
